import fs from 'fs-extra'
import path from 'node:path'
import process from 'node:process'
import { QUESTIONS_PATH } from './path'

const questionsName: string | undefined = process.argv[2]

if (!questionsName) {
  throw new Error('missing problem name')
}

fs.pathExists(path.join(QUESTIONS_PATH, questionsName)).then((isExists) => {
  if (isExists) {
    throw new Error('problem already exists')
  }
})

fs.ensureDir(path.join(QUESTIONS_PATH, questionsName)).then(() => {
  fs.ensureFile(path.join(QUESTIONS_PATH, questionsName, 'template.ts'))
  fs.ensureFile(path.join(QUESTIONS_PATH, questionsName, 'test-cases.ts'))
})
