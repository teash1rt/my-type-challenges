type Flatten<T extends any[]> = T['length'] extends 0 ? [] : T extends [infer E, ...infer P] ? E extends any[] ? Flatten<[...E, ...P]> : [E, ...Flatten<[...P]>] : never
