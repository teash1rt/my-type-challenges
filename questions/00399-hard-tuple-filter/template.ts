type FilterOut<T extends any[], F> = T extends [infer L, ...infer R]
  ? [L] extends [F]
    ? [...FilterOut<[...R], F>]
    : [L, ...FilterOut<[...R], F>]
  : []

// 如果要判断泛型参数T是否是never，需要用[]包裹
// https://juejin.cn/post/7165170011282079751#heading-14
// [L] extends [F] 的顺序不能互换：[never] extends [1]  != [1] extends [never]
