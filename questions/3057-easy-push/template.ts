type Push<T, U> = T extends [...infer P] ? [...P, U] : never
