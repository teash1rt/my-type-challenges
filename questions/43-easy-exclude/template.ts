type MyExclude<T, U> = T extends U ? never : T

// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types