import { parse } from '@babel/parser'
import fs from 'fs-extra'
import path from 'node:path'
import he from 'he'
import chalk from 'chalk'
import { BUILD_PATH, QUESTIONS_PATH, SCRIPTS_PATH } from './path'
import { Flow } from './flow'

const getComments = (files: string[]) => {
  const questions = files.filter((question) => /^\d+-/.test(question))
  const comments: string[] = []
  return new Flow(
    questions.map((question) => {
      return {
        name: `get comment from ${question}`,
        command: () => {
          const buffer = fs.readFileSync(path.join(QUESTIONS_PATH, question, 'template.ts'))
          parse(buffer.toString('utf8'), {
            sourceType: 'module',
            plugins: ['typescript'],
          }).comments?.map((v) => {
            comments.push(he.encode(v.value))
          })
          return Promise.resolve(comments)
        },
      }
    }),
  ).run()
}

const generateSite = async (comments: string[]) => {
  return new Flow([
    {
      name: 'ensure dir',
      command: () => fs.ensureDir(BUILD_PATH),
    },
    {
      name: 'read file',
      command: () => fs.readFile(path.join(SCRIPTS_PATH, 'template.html')),
    },
    {
      name: 'generate site',
      command: (buffer: Buffer) =>
        fs.writeFile(
          path.join(BUILD_PATH, 'index.html'),
          buffer.toString('utf8').replace(
            /{{\w+}}/,
            comments
              .map((comment) => {
                return `<p>${comment}</p>`
              })
              .join(''),
          ),
        ),
    },
  ]).run()
}

const siteFlow = new Flow([
  {
    name: 'get files',
    command: () => fs.readdir(QUESTIONS_PATH),
    okMsg: 'Get Questions Finish',
  },
  {
    name: 'get comments',
    command: (files: string[]) => getComments(files),
    okMsg: 'Get Comments Finish',
  },
  {
    name: 'generate site',
    command: (comments: string[]) => generateSite(comments),
    okMsg: 'Generate Site Finish',
  },
])

siteFlow.run().then(() => {
  console.log(chalk.green('Site Flow Finish'))
})
