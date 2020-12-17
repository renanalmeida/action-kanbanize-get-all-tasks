import * as core from '@actions/core'
import {getTasks} from './kanbanizeAPI'

async function run(): Promise<void> {
  try {
    const board = core.getInput('board')

    const column = core.getInput('column')

    const apikey = core.getInput('apikey')

    const subdomain = core.getInput('subdomain')

    getTasks(board, column, apikey, subdomain)
      .then((response: Task[]) => {
        let result = ''

        response.forEach(item => {
          result += `• ${item.title}\n`
        })

        core.setOutput('tasks', result)
      })
      .catch(err => {
        core.debug(`err ${err}`)
      })
  } catch (error) {
    core.setFailed(error.message)
  }
}
run()
