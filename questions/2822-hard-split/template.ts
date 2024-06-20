type Split<S extends string, SEP extends string = never, G extends string[] = []> = string extends S
  ? string[]
  : [SEP] extends [never]
    ? [S]
    : S extends `${infer L}${SEP}${infer R}`
      ? Split<R, SEP, [...G, L]>
      : SEP extends ''
        ? G
        : [...G, S]
