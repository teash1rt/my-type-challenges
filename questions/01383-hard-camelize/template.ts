type ToCamel<S extends string> = S extends `${infer L}_${infer R}`
  ? `${L}${ToCamel<MyCapitalize<R>>}`
  : S

type CamelArray<A extends unknown[], V extends unknown[] = []> = A extends [infer L, ...infer R]
  ? L extends Record<string, unknown>
    ? CamelArray<R, [...V, Camelize<L>]>
    : CamelArray<R, [...V, L]>
  : V

type Camelize<T extends Record<string, unknown>> = {
  [key in keyof T as ToCamel<key & string>]: T[key] extends Record<string, unknown>
    ? Camelize<T[key]>
    : T[key] extends unknown[]
      ? CamelArray<T[key]>
      : T[key]
}

// BUG 泛型在 extends 左侧才会分配

// When conditional types act on a generic type, they become distributive when given a union type. For example, take the following
