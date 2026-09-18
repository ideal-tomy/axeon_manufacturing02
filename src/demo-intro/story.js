/** @typedef {readonly [number, number, number]} Camera */
/** @typedef {"dash"|"incident"|"cause"|"capa"} DeviceId */

/** @type {{ title: string; caption: string; duration: number; camera: Camera; stars: readonly DeviceId[]; focus?: string }[]} */
export const scenes = [
  { title: "優先案件", caption: "今日の優先は、Cラインの表面キズ。", duration: 5500, camera: [190, 175, 1.22], stars: ["dash"] },
  { title: "詳細へ", caption: "写真と判定が、同じ案件の続きにつながる。", duration: 4500, camera: [370, 175, 0.94], stars: ["dash", "incident"] },
  { title: "写真とAI", caption: "どこが異常か、写真とAIが一緒に示す。", duration: 6000, camera: [550, 175, 1.2], stars: ["incident"] },
  { title: "原因調査へ", caption: "判定だけで終わらず、履歴と相関へ進む。", duration: 4500, camera: [730, 175, 0.94], stars: ["incident", "cause"] },
  { title: "相関を見る", caption: "搬送・検査・類似事例が一本につながる。", duration: 6000, camera: [910, 175, 1.18], stars: ["cause"], focus: "graph" },
  { title: "根拠と候補", caption: "根拠付きで、搬送治具の接触痕が浮かぶ。", duration: 6500, camera: [910, 175, 1.18], stars: ["cause"], focus: "evidence" },
  { title: "是正へ", caption: "原因が見えたら、その場で処置に入る。", duration: 4500, camera: [1090, 175, 0.94], stars: ["cause", "capa"] },
  { title: "是正を記録", caption: "保護材交換。同一条件で再発なし。", duration: 6000, camera: [1270, 175, 1.18], stars: ["capa"], focus: "plan" },
  { title: "承認まで", caption: "責任者確認まで同じ案件で終わる。", duration: 6000, camera: [1270, 175, 1.18], stars: ["capa"], focus: "report" },
  { title: "次の行動へ", caption: "発見から、再発防止の記録まで。", duration: 5000, camera: [1270, 175, 1.05], stars: ["capa"], focus: "report" },
];

export const totalDuration = scenes.reduce((sum, scene) => sum + scene.duration, 0);

/**
 * @param {number} time
 */
export function storyFrame(time) {
  let elapsed = ((time % totalDuration) + totalDuration) % totalDuration;
  let index = 0;
  while (index < scenes.length - 1 && elapsed >= scenes[index].duration) {
    elapsed -= scenes[index++].duration;
  }
  const previous = scenes[index === 0 ? 0 : index - 1];
  const next = scenes[index];
  const t = Math.min(1, elapsed / 1200);
  const ease = t * t * (3 - 2 * t);
  const camera = /** @type {Camera} */ (next.camera.map((value, i) => previous.camera[i] + (value - previous.camera[i]) * ease));
  return {
    index,
    elapsed,
    camera,
    stars: next.stars,
    previousStars: previous.stars,
    ease,
    focus: next.focus ?? "",
  };
}
