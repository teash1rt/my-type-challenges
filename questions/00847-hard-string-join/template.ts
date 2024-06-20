type _join<D extends string, P extends string[], K extends string = ''> = P['length'] extends 0
  ? K
  : P extends [infer L, ...infer R]
    ? R extends string[]
      ? K extends ''
        ? _join<D, R, `${L & string}`>
        : _join<D, R, `${K}${D}${L & string}`>
      : never
    : never

declare function join<D extends string>(
  delimiter: D,
): <P extends string[]>(...parts: P) => _join<D, P>
