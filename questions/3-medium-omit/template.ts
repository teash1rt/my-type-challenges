type MyOmit<T, K extends keyof T> = {
    [P in keyof T as P extends K ? never : P]: T[P]
}

// https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as
// https://github.com/type-challenges/type-challenges/issues/4

//type MPick<T, K extends keyof T> = {
//    [P in K]: T[P]
//}

//type MExclude<T, K> = T extends K ? never : T

//type MyOmit<T, K extends keyof T> = MPick<T, MExclude<keyof T, K>>