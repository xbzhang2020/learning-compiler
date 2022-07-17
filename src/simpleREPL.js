/**
 * 简易的REPL：复读机
 */
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
})

rl.prompt()

rl.on('line', (line) => {
  console.log(`echo: ${line}`)
  rl.prompt()
}).on('close', () => {
  console.log('Bye!')
  process.exit(0)
})
