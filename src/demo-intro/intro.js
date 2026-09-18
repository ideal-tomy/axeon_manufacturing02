import { scenes, storyFrame, totalDuration } from "./story.js";
import { renderScreens } from "./screens.js";

/** @type {{ root: HTMLElement; clock: number; paused: boolean; reduced: boolean; visible: boolean; width: number; raf: number; last?: number; observer?: ResizeObserver; onMotion?: () => void; onVisibility?: () => void; onClick?: (e: Event) => void } | null} */
let live = null;

function fitFor(count) {
  return count >= 2 ? 720 : 420;
}

/**
 * @param {HTMLElement} host
 */
export function mountIntro(host) {
  unmountIntro();

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.createElement("section");
  root.className = "qi-intro";
  root.setAttribute("aria-label", "品質インシデント対応の使い方");
  root.innerHTML = `
    <div class="qi-intro-top"><span>使い方を見てみる</span><span>約55秒 · サンプル案件 A-214</span></div>
    <div class="qi-viewport" data-scene="0" data-time="0" data-paused="false">
      <div class="qi-stage" aria-hidden="true" inert></div>
      <div class="qi-hud">
        <div class="qi-dots" aria-hidden="true">${scenes.map(() => "<span></span>").join("")}</div>
        <p></p>
      </div>
    </div>
    <div class="qi-controls">
      <p class="qi-status"></p>
      <div class="qi-btns">
        <button type="button" data-qi="pause" aria-label="紹介を一時停止する">Ⅱ 一時停止</button>
        <button type="button" data-qi="restart">最初から</button>
      </div>
    </div>
  `;
  host.appendChild(root);

  const viewport = /** @type {HTMLElement} */ (root.querySelector(".qi-viewport"));
  const stage = /** @type {HTMLElement} */ (root.querySelector(".qi-stage"));
  const caption = /** @type {HTMLElement} */ (root.querySelector(".qi-hud p"));
  const dots = [...root.querySelectorAll(".qi-dots span")];
  const status = /** @type {HTMLElement} */ (root.querySelector(".qi-status"));
  const pauseBtn = /** @type {HTMLButtonElement} */ (root.querySelector('[data-qi="pause"]'));
  const btns = /** @type {HTMLElement} */ (root.querySelector(".qi-btns"));

  live = {
    root,
    clock: 0,
    paused: false,
    reduced,
    visible: !document.hidden,
    width: viewport.getBoundingClientRect().width || 720,
    raf: 0,
  };
  /** @type {string} */
  let screenKey = "";

  const paint = () => {
    if (!live) return;
    const current = storyFrame(live.clock);
    const index = live.reduced ? scenes.length - 1 : current.index;
    const camera = live.reduced ? scenes[scenes.length - 1].camera : current.camera;
    const stars = live.reduced ? scenes[scenes.length - 1].stars : current.stars;
    const focus = live.reduced
      ? scenes[scenes.length - 1].focus ?? ""
      : current.focus;
    const prevStars = live.reduced ? stars : current.previousStars;
    const fit = live.reduced
      ? fitFor(stars.length)
      : fitFor(prevStars.length) + (fitFor(stars.length) - fitFor(prevStars.length)) * current.ease;
    const scale = camera[2] * Math.min(1, (live.width - 24) / fit);
    const nextKey = `${stars.join(",")}|${focus}`;
    if (nextKey !== screenKey) {
      stage.innerHTML = renderScreens({ stars, focus });
      screenKey = nextKey;
    }
    stage.style.transform = `translate(${live.width / 2 - camera[0] * scale}px, ${168 - camera[1] * scale}px) scale(${scale})`;
    stage.style.opacity = "1";

    caption.textContent = scenes[index].caption;
    dots.forEach((dot, i) => dot.classList.toggle("qi-current", i === index));
    viewport.dataset.scene = String(index);
    viewport.dataset.time = String(Math.round(live.clock));
    viewport.dataset.paused = String(live.paused || live.reduced);

    if (live.reduced) {
      status.textContent = "動きを抑えた表示になっています";
      btns.hidden = true;
    } else {
      status.textContent = `${index + 1} / ${scenes.length}　${scenes[index].title}`;
      btns.hidden = false;
      pauseBtn.textContent = live.paused ? "▶ 再生" : "Ⅱ 一時停止";
      pauseBtn.setAttribute("aria-label", live.paused ? "紹介を再生する" : "紹介を一時停止する");
    }
  };

  const stopLoop = () => {
    if (live?.raf) cancelAnimationFrame(live.raf);
    if (live) live.raf = 0;
  };

  const startLoop = () => {
    if (!live || live.paused || live.reduced || !live.visible) return;
    stopLoop();
    live.last = undefined;
    const tick = (now) => {
      if (!live || live.paused || live.reduced || !live.visible) return;
      if (live.last !== undefined) live.clock = (live.clock + now - live.last) % totalDuration;
      live.last = now;
      paint();
      live.raf = requestAnimationFrame(tick);
    };
    live.raf = requestAnimationFrame(tick);
  };

  const syncAnimations = () => {
    if (!live) return;
    const animations = viewport.getAnimations?.({ subtree: true }) ?? [];
    if (live.paused || !live.visible) animations.forEach((a) => a.pause());
    else animations.forEach((a) => a.play());
  };

  live.onMotion = () => {
    if (!live) return;
    live.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (live.reduced) {
      live.clock = totalDuration - scenes[scenes.length - 1].duration;
      stopLoop();
    } else startLoop();
    paint();
  };
  live.onVisibility = () => {
    if (!live) return;
    live.visible = !document.hidden;
    if (live.visible) startLoop();
    else stopLoop();
    syncAnimations();
  };
  live.onClick = (e) => {
    const btn = /** @type {HTMLElement|null} */ (/** @type {HTMLElement} */ (e.target).closest("[data-qi]"));
    if (!btn || !live) return;
    e.stopPropagation();
    if (btn.dataset.qi === "pause") {
      live.paused = !live.paused;
      if (live.paused) stopLoop();
      else startLoop();
      syncAnimations();
      paint();
    } else if (btn.dataset.qi === "restart") {
      live.clock = 0;
      live.paused = false;
      startLoop();
      paint();
    }
  };

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionQuery.addEventListener("change", live.onMotion);
  document.addEventListener("visibilitychange", live.onVisibility);
  root.addEventListener("click", live.onClick);

  live.observer = new ResizeObserver(([entry]) => {
    if (!live) return;
    live.width = entry.contentRect.width;
    paint();
  });
  live.observer.observe(viewport);

  paint();
  startLoop();
}

export function unmountIntro() {
  if (!live) return;
  if (live.raf) cancelAnimationFrame(live.raf);
  live.observer?.disconnect();
  if (live.onMotion) {
    window.matchMedia("(prefers-reduced-motion: reduce)").removeEventListener("change", live.onMotion);
  }
  if (live.onVisibility) document.removeEventListener("visibilitychange", live.onVisibility);
  if (live.onClick) live.root.removeEventListener("click", live.onClick);
  live.root.remove();
  live = null;
}
