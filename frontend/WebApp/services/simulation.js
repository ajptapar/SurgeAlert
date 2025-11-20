let level = 14.5;

export function simulateWaterLevel() {
  const variation = (Math.random() - 0.5) * 0.3;
  level += variation;

  if (level < 13.5) level = 13.5;
  if (level > 19) level = 19;

  return Number(level.toFixed(2));
}
