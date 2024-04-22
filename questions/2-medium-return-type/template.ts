type MyReturnType<T> = T extends (..._: any) => infer P ? P : never
