import simpleGit from 'simple-git'
import { Flow } from './flow'

const git = simpleGit()

const flow = new Flow([
  {
    name: 'git add',
    command: () => git.add('./*'),
    okMsg: 'Add Finish',
  },
  {
    name: 'git commit',
    command: () => git.commit('feat: init simple-git'),
    okMsg: 'Commit Finish',
  },
  {
    name: 'git push',
    command: () => git.push('origin', 'feat/git-cd'),
    okMsg: 'Push Finish',
  },
])

flow
  .run()
  .then(() => {
    console.log('Git Flow Finish')
  })
  .catch((err) => {
    console.error(err)
  })

//git
//  .add('./*')
//  .then(() => {
//    console.log('Files added!')
//  })
//  .then(() => {
//    git
//      .commit('feat: init simple-git')
//      .then(() => {
//        console.log('Committed!')
//      })
//      .then(() => {
//        git.push('origin', 'feat/git-cd').then(() => {
//          console.log('Pushed!')
//        })
//      })
//  })
