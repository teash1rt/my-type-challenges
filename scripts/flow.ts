import chalk from 'chalk'
import { once } from './decorator'

export type Task<T = any, U = any> = {
  name: string
  command: (arg: T) => Promise<U>
  okMsg?: string
}

export class Flow {
  tasks: Task[]
  currentIdx: number

  constructor(tasks: Task[]) {
    if (tasks.length !== new Set(tasks.map((task) => task.name)).size) {
      throw new Error('duplicate task name')
    }
    this.tasks = tasks
    this.currentIdx = 0
  }

  @once
  private errorLog(err: unknown) {
    console.log(chalk.yellow(`flow error: at ${this.tasks[this.currentIdx].name}`))
    console.log(chalk.red(`details: ${err}`))
  }

  public async run(arg?: unknown): Promise<unknown> {
    if (this.currentIdx === this.tasks.length) {
      return Promise.resolve(arg)
    }

    return this.tasks[this.currentIdx]
      .command(arg)
      .then((res) => {
        this.tasks[this.currentIdx].okMsg && console.log(this.tasks[this.currentIdx].okMsg)
        this.currentIdx += 1
        return this.run(res)
      })
      .catch((err) => {
        this.errorLog(err)
        return Promise.reject(err)
      })
  }
}
