import { parse } from '@babel/parser'
import fs from 'fs-extra'
import path from 'node:path'
import he from 'he'
import { BUILD_PATH, QUESTIONS_PATH } from './path'

const extract = (code: string) => {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript'],
  })
  return ast.comments
}

const folder = fs.readdirSync(QUESTIONS_PATH)
const comments: string[] = []

for (let i = 0; i < folder.length; i++) {
  if (!/^\d+-/.test(folder[i])) {
    continue
  }
  const buffer = fs.readFileSync(path.join(QUESTIONS_PATH, folder[i], 'template.ts'))
  extract(buffer.toString('utf8'))?.map((v) => {
    comments.push(he.encode(v.value))
  })
}

const SITE_TEMPLATE = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>site</title>
  </head>
  <body>
    <div id="site">
      {{content}}
    </div>
  </body>
</html>
`

fs.ensureDirSync(BUILD_PATH)
fs.writeFileSync(
  path.join(BUILD_PATH, 'index.html'),
  SITE_TEMPLATE.replace(
    /{{\w+}}/,
    comments
      .map((comment) => {
        return `<p>${comment}</p>`
      })
      .join(''),
  ),
)
