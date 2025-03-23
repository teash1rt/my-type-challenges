type FlattenDepth<A extends any[], D = 1, C extends ''[] = []> = D extends C['length']
  ? A
  : A extends [infer L, ...infer R]
    ? L extends any[]
      ? [...FlattenDepth<L, D, [...C, '']>, ...FlattenDepth<R, D, C>]
      : [L, ...FlattenDepth<R, D, C>]
    : A
