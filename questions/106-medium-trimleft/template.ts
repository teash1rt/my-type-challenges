type Whitespace = ' ' | '\n' | '\t'

type TrimLeft<S extends string> = S extends '' ? '' : S extends `${infer P}${infer U}` ? P extends Whitespace ? TrimLeft<U> : `${P}${U}` : never

//type Whitespace = '\n' | ' ' | '\t';
//type TrimLeft<S> = S extends `${Whitespace}${infer U}` ? TrimLeft<U> : S;