type TupleToObject<T extends readonly (keyof any)[]> = {
  [P in T[number]]: P
}

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

// key of any -> string | number | symbol
