type FlipArguments<T extends Function> = T extends (..._: infer P) => infer R
  ? (..._: Reverse<P>) => R
  : never
