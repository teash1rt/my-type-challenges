type Trunc<T extends string | number> = `${T}` extends `${infer L}.${infer _}`
    ? L extends ''
        ? '0'
        : L
    : `${T}`
