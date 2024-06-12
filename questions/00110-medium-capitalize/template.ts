enum m {
  a = 'A',
  b = 'B',
  c = 'C',
  d = 'D',
  e = 'E',
  f = 'F',
  g = 'G',
  h = 'H',
  i = 'I',
  j = 'J',
  k = 'K',
  l = 'L',
  m = 'M',
  n = 'N',
  o = 'O',
  p = 'P',
  q = 'Q',
  r = 'R',
  s = 'S',
  t = 'T',
  u = 'U',
  v = 'V',
  w = 'W',
  x = 'X',
  y = 'Y',
  z = 'Z',
}

type MyCapitalize<S extends string> = S extends `${infer L}${infer R}`
  ? L extends keyof typeof m
    ? `${(typeof m)[L]}${R}`
    : S
  : ''

// 竟然有内置类型 Uppercase....
