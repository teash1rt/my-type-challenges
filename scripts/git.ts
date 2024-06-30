import simpleGit from 'simple-git'
import { Flow } from './flow'

const git = simpleGit()

const commitMsg: string | undefined = process.argv.slice(2).join(' ')

if (!commitMsg) {
  throw new Error('missing commit message')
}

const COMMIT_PREFIX = ['feat', 'fix', 'refactor', 'chore', 'docs'] as const

const commitCheck = () => {
  if (
    !COMMIT_PREFIX.some((item) => {
      return commitMsg.startsWith(item + ':')
    })
  ) {
    return Promise.reject('wrong commit prefix')
  }

  if (process.argv[3] === undefined) {
    return Promise.reject('missing commit body')
  }

  return Promise.resolve()
}

const gitFlow = new Flow([
  {
    name: 'commit check',
    command: commitCheck,
    okMsg: 'Check Finish',
  },
  {
    name: 'git add',
    command: () => git.add('./*'),
    okMsg: 'Add Finish',
  },
  {
    name: 'git commit',
    command: () => git.commit(commitMsg),
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

gitFlow
  .run()
  .then(() => {
    console.log('Git Flow Finish')
  })
  .catch((err) => {
    console.error(err)
  })
