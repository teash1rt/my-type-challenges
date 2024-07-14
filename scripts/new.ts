import fs from 'fs-extra'
import path from 'node:path'
import process from 'node:process'
import chalk from 'chalk'
import { Flow } from './flow'
import { QUESTIONS_PATH } from './path'

const questionsName: string | undefined = process.argv[2]

const checkValid = () => {
  if (!questionsName || !/^\d+-.*/.test(questionsName)) {
    return Promise.reject('wrong problem name')
  }

  const isExists = fs.pathExistsSync(path.join(QUESTIONS_PATH, questionsName))
  if (isExists) {
    return Promise.reject('problem already exists')
  }

  return Promise.resolve()
}

const newFlow = new Flow([
  {
    name: 'check valid',
    command: checkValid,
    okMsg: 'Check Valid Finish',
  },
  {
    name: 'make dir',
    command: () => fs.ensureDir(path.join(QUESTIONS_PATH, questionsName)),
    okMsg: 'Make Dir Finish',
  },
  {
    name: 'make template',
    command: () => fs.ensureFile(path.join(QUESTIONS_PATH, questionsName, 'template.ts')),
    okMsg: 'Make Template Finish',
  },
  {
    name: 'make test',
    command: () => fs.ensureFile(path.join(QUESTIONS_PATH, questionsName, 'test-cases.ts')),
    okMsg: 'Make Test Finish',
  },
])

newFlow.run().then(() => {
  console.log(chalk.green('New Flow Finish'))
})
