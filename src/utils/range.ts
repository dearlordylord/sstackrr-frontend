export const range = (from: number, to: number, step: number = 1): number[] => [...Array(Math.floor((to - from) / step))].map((_, i) => from + i * step);
