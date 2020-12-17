const axios = require('axios').default

export async function getTasks(
  board: string,
  column: string,
  apikey: string,
  subdomain: string
): Promise<Task[]> {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: `https://${subdomain}.kanbanize.com/index.php/api/kanbanize`,
      timeout: 5000,
      headers: {apikey}
    })
    instance
      .post('get_all_tasks/format/json', {
        boardid: board,
        column
      })
      .then((response: any) => {
        const tasks: Task[] = response.data
        resolve(tasks)
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}
