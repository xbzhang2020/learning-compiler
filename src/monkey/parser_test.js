import Parser from './parser.js'
import Lexer from './lexer.js'
import { Node } from './ast.js'
import repl from './repl.js'

function parse(input) {
  const lexer = new Lexer(input)
  const tokens = lexer.tokenize()
  const parser = new Parser(tokens)
  const res = parser.parse()
  return res
}

function print(ast) {
  Node.dump(ast)
}

function test1() {
  // let input = '1 * 2 + 3 * 4'
  // let input = 'let age1 = 24;'
  // let input = 'let a = 1;'
  // let input = '{1 + 2; let a = 3 + 4;} 111;'
  // let input = 'return 1 + 2;'

  // let input = `
  //   let age = 20;
  //   let res;
  //   if (age < 18) {
  //     return 1;
  //   } else if (a >= 60){
  //     return 2;
  //   } else {
  //     return 3;
  //   }`
  // let input = 'res = a + 2 * 3;'
  let input = 'let a = function(x,y) { return x + y; }'
  // let input = 'fn();'

  const res = parse(input)
  print(res)
}

function test2() {
  repl(parse, print)
}

// test1()
test2()
