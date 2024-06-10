import simpleGit from 'simple-git'
import { Flow, type Task } from './flow'

const git = simpleGit()

const commitMsg: string | undefined = process.argv.slice(2).join(' ')

if (!commitMsg) {
  throw new Error('missing commit message')
}

const flow = new Flow([
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
    command: (branch) => git.push('origin', branch),
    okMsg: 'Push Finish',
  } satisfies Task<string>,
])

flow
  .run()
  .then(() => {
    console.log('Git Flow Finish')
  })
  .catch((err) => {
    console.error(err)
  })
