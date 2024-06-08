type AppendArgument<Fn extends Function, A> = Fn extends (...A: infer P) => infer U
  ? (..._: [...P, A]) => U
  : never
