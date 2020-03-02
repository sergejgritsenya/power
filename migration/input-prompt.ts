export const inputPromt = (question: string): Promise<string> => {
  const rl = require("readline")
  const r = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  })
  return new Promise(resolve => {
    r.question(question, (answer: string) => {
      r.close()
      resolve(answer)
    })
  })
}
