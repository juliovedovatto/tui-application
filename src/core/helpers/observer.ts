function setPageViewportHeight(minHeight: number) {
  const minHeightValue = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--min-height')) || minHeight;
  const rootElement = document.querySelector(':root') as HTMLElement

  rootElement.style.setProperty('--viewport-height', Math.max(minHeightValue, window.innerHeight) + 'px');
}

export function pageViewportHeightObserver(minHeight = 600): void {
  setPageViewportHeight(minHeight)

  window.addEventListener('resize', () => {
    setPageViewportHeight(minHeight);
  }, false);
}
