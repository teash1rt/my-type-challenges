import chalk from 'chalk'

export type Task<T = any, U = any> = {
  name: string
  command: (arg: T) => Promise<U>
  okMsg?: string
}

export class Flow {
  tasks: Task[]

  constructor(tasks: Task[]) {
    if (tasks.length !== new Set(tasks.map((task) => task.name)).size) {
      throw new Error('duplicate task name')
    }
    this.tasks = tasks
  }

  public async run(): Promise<unknown> {
    let tmpRes
    for (const task of this.tasks) {
      try {
        tmpRes = await task.command(tmpRes)
        task.okMsg && console.log(task.okMsg)
      } catch (err) {
        console.log(chalk.yellow(`error at: <${task.name}>`), chalk.red(`details: ${err}`))
        return Promise.reject(err)
      }
    }
    return Promise.resolve(tmpRes)
  }
}
