type IsAny<T> = 0 extends 1 & T ? true : false

// 如果 B 是 A 的超类型，则 A & B 等价于 A
// type A = any & 1 // any
// type B = undefined & 1 // never
// type C = unknown & 1 // 1
// type D = never & 1 // never
// type E = string & 1 // never
