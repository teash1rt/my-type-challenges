type Reverse<T extends any[]> = T extends [...infer P, infer E] ? [E, ...Reverse<[...P]>] : T
