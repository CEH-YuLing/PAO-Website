// Decorative motion should yield before it makes scrolling or controls sluggish.
export function createAnimationBudget() {
  let slowFrames = 0, limited = false;
  return {
    get limited() { return limited; },
    record(workMs, gapMs = 0) {
      // Ignore long gaps after a tab was backgrounded or the device was asleep.
      const overloaded = workMs > 40 || (gapMs > 160 && gapMs < 1000);
      slowFrames = overloaded ? slowFrames + 1 : Math.max(0, slowFrames - 1);
      if (slowFrames >= 3) limited = true;
      return limited;
    },
  };
}
export function hasUsefulStarfieldArea(viewportHeight, clippedTop) {
  return viewportHeight > 0 && viewportHeight - clippedTop >= Math.min(160, viewportHeight * .25);
}
export function isSoftwareGraphics(renderer) {
  return /swiftshader|llvmpipe|softpipe|software renderer|microsoft basic render|\bwarp\b|gdi generic/i.test(String(renderer || ''));
}
