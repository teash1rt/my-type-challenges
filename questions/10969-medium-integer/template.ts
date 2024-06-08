type Integer<T extends number> = number extends T
  ? never
  : `${T}` extends `${infer _}.${infer _}`
    ? never
    : T
