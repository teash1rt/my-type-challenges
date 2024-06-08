type IndexOf<T extends any[], U, P extends any[] = []> = T['length'] extends 0
  ? -1
  : T extends [infer L, ...infer _]
    ? Equal<L, U> extends true
      ? P['length']
      : IndexOf<Shift<T>, U, [...P, 0]>
    : never
