// not importing a whole lib just for that

import { range } from './range';

export function zip<T extends unknown[][]>(
  ...args: T
): { [K in keyof T]: T[K] extends (infer V)[] ? V : never }[] {
  const minLength = Math.min(...args.map((arr) => arr.length));
  return range(0, minLength).map((i) => args.map((arr) => arr[i])) as { [K in keyof T]: T[K] extends (infer V)[] ? V : never; }[];
}
