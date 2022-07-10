/**
 * 简易计算器
 */
import { SimpleLexer } from './simpleLexer.mjs'

export class SimpleCalcuator {
  constructor() {}
}

/**
 * 测试代码
 */
function test1() {
  let input = 'int age = 18;'
  const lexer = new SimpleLexer()
  const res = lexer.tokenize(input)
  console.log(res)
}

test1()
