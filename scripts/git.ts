import simpleGit, { type StatusResult } from 'simple-git'
import chalk from 'chalk'
import { Flow } from './flow'

const git = simpleGit()

enum CommitType {
  FINISH = '-f',
  SITE = '-s',
}

const getMessage = (status: StatusResult) => {
  switch (process.argv[2]) {
    case CommitType.FINISH:
      const questions = status.files
        .map((file) => file.path)
        .filter((path) => /^questions\/\d+-.*\/template.ts/.test(path))
        .map((path) => path.split('/')[1].split('-')[0])
        .sort((a, b) => Number(a) - Number(b))
        .join(', ')
      return Promise.resolve(`feat: finish ${questions}`)
    case CommitType.SITE:
      return Promise.resolve('site: update site')
    default:
      return Promise.reject('wrong commit arg')
  }
}

const gitFlow = new Flow([
  {
    name: 'git add',
    command: () => git.add('./*'),
    okMsg: 'Add Finish',
  },
  {
    name: 'git status',
    command: () => git.status(),
    okMsg: 'Get Status Finish',
  },
  {
    name: 'get message',
    command: (status) => getMessage(status),
    okMsg: 'Get Message Finish',
  },
  {
    name: 'git commit',
    command: (msg) => git.commit(msg),
    okMsg: 'Commit Finish',
  },
  {
    name: 'get head',
    command: () => git.revparse(['--abbrev-ref', 'HEAD']),
    okMsg: 'Get Head Finish',
  },
  {
    name: 'git push',
    command: (branch: string) => git.push('origin', branch),
    okMsg: 'Push Finish',
  },
])

gitFlow.run().then(() => {
  console.log(chalk.green('Git Flow Finish'))
})
