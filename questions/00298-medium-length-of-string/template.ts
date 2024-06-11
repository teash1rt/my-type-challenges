type LengthOfString<S extends string, U extends string[] = []> = S extends `${infer L}${infer R}`
  ? LengthOfString<R, [...U, L]>
  : U['length']
