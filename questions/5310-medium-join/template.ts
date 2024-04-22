type Get<T extends unknown[]> = T['length'] extends 0 ? '' : T extends [infer P] ? `${P & string}` : never

type Join<T extends unknown[], U extends string | number> = T['length'] extends 0 | 1 ?
    Get<T> : T extends [infer L extends string, ...infer M, infer R extends string]
    ? M['length'] extends 0 ? `${L}${U}${R}` : `${L}${U}${Join<M, U>}${U}${R}` : never
