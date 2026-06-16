export function withUnit(value: number, unit: string) {
  return `${value}${unit}`;
}

export function toPercent(value: number) {
  return `${value.toFixed(1)}%`;
}
