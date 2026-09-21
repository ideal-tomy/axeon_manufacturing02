export const SELECTION_FROM = 'axeon-demo-selection';
export const SELECTION_DETAIL_URL =
  'https://axeon-demo-selection.vercel.app/?demo=quality-incident';

const STORAGE_KEY = 'qi-from-selection';

export function syncSelectionEntry() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('from') === SELECTION_FROM) {
    sessionStorage.setItem(STORAGE_KEY, '1');
  }
}

export function hasSelectionEntry() {
  return sessionStorage.getItem(STORAGE_KEY) === '1';
}

export function selectionReturnUrl() {
  return hasSelectionEntry() ? SELECTION_DETAIL_URL : null;
}

/** @returns {'dashboard'|null} */
export function startPageFromQuery() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('start') === 'dashboard') return 'dashboard';
  return null;
}
