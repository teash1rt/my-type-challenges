type IndexOf<T extends any[], U, P extends any[] = []> = T['length'] extends 0
    ? -1
    : T extends [infer L, ...infer _]
      ? Equal<L, U> extends true
          ? P['length']
          : IndexOf<Shift<T>, U, [...P, 0]>
      : never

type c = IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>
