type LookUp<U, T> = U extends { type: T } ? U : never;

//type LookUp<U, T extends string> = U extends { type: infer P } ? P extends T ? U : never : never
