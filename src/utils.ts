/**
 * Randomly select an item from an array
 */
export function randomSelect<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Generate a random spin duration with some variance
 */
export function getSpinDuration(baseDuration: number): number {
  const variance = 500; // +/- 500ms
  return baseDuration + (Math.random() * variance * 2 - variance);
}

/**
 * Easing function for smooth deceleration
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
