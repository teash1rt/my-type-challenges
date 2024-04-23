type FalseCase = 0 | '' | [] | false | Record<string, never> | null | undefined

type AnyOf<T extends readonly any[]> = T extends [infer L, ...infer R]
  ? L extends FalseCase
    ? AnyOf<R>
    : true
  : false

// 空对象 -> Record<string, never>
// {} 等价于任何非 null 非 undefined 的类型
// 并且有：type NonNullable<T> = T extends null | undefined ? never : T 等价于 T & {}
// 换句话说，string、number、boolean 等常见类型也能够被赋给 {}
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-8.html#improved-intersection-reduction-union-compatibility-and-narrowing
