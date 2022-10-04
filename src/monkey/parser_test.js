import Parser from './parser.js'
import Lexer from './lexer.js'
import { Node } from './ast.js'

function test1() {
  // let input = '1 * 2 + 3 * 4'
  // let input = 'let age1 = 24;'
  // let input = 'let a = 1;'
  let input = '{1 + 2; let a = 3 + 4;} 111;'

  //   let input = `
  //   let age = 20;
  //   if(age >= 18) {
  //     return true
  //   } else {
  //     return false
  //   }`

  const lexer = new Lexer(input)
  const tokens = lexer.tokenize()
  // console.log(tokens)

  const parser = new Parser(tokens)
  const res = parser.parse()
  Node.dump(res)
}

test1()
