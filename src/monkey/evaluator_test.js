import Evaluator from './evaluator.js'
import Parser from './parser.js'
import Lexer from './lexer.js'
import { Node } from './ast.js'

function myEval(input) {
  const lexer = new Lexer(input)
  const tokens = lexer.tokenize()
  const parser = new Parser(tokens)
  const ast = parser.parse()
  Node.dump(ast)
  const evaluator = new Evaluator()
  const res = evaluator.eval(ast)
  return res
}

function print(res) {
  if (Array.isArray(res)) {
    res.forEach((item) => console.log(item && item.toString()))
  } else {
    console.log(res && res.toString())
  }
}

function test1() {
  // let input = '1;'
  // let input = 'true;'
  // let input = '-20;'
  // let input = '1 * 2 - 3;'
  // let input = '1 + 2 == 2 + 1;'
  // let input = 'return 2;'
  // let input = '{1; return 2;}'
  let input = 'if(10 > 0) {return 1;} else {return 2;}'
  const res = myEval(input)
  print(res)
}

test1()
