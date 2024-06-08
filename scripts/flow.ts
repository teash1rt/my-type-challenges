type Task<T = unknown, U = unknown> = {
  name: string
  command: (arg?: T) => Promise<U>
  okMsg: string
}

export class Flow {
  tasks: Task[]
  currentIdx: number

  constructor(tasks: Task[]) {
    this.tasks = tasks
    this.currentIdx = 0
  }

  async run(arg?: unknown): Promise<unknown> {
    if (this.currentIdx === this.tasks.length) {
      return Promise.resolve('good')
    }

    return this.tasks[this.currentIdx]
      .command(arg)
      .then((res) => {
        console.log(this.tasks[this.currentIdx].okMsg)
        this.currentIdx += 1
        return this.run(res)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  }
}
