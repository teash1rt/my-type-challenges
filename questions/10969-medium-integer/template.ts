type Integer<T extends number> = number extends T
  ? never
  : `${T}` extends `${infer L}.${infer R}`
    ? never
    : T
