/**
 * 一个简单的REPL实现
 */
import readline from 'readline'

export function print(res) {
  if (Array.isArray(res)) {
    res.forEach((item) => console.log(item))
  } else {
    console.log(res)
  }
}

/**
 *
 * @param {*} evaluate 计算函数
 * @param {*} print 打印函数
 */
function repl(evaluate = (line) => line, print = console.log) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  })

  rl.prompt()

  rl.on('line', (line) => {
    try {
      const res = evaluate(line)
      print(res)
    } catch (e) {
      console.log('Error: ' + e.message)
    }

    rl.prompt()
  }).on('close', () => {
    console.log('Bye!')
    process.exit(0)
  })
}

export default repl
