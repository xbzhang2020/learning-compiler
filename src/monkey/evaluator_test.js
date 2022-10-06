import Evaluator from './evaluator.js'
import Parser from './parser.js'
import Lexer from './lexer.js'
import repl from './repl.js'

function parse(input) {
  const lexer = new Lexer(input)
  const tokens = lexer.tokenize()
  const parser = new Parser(tokens)
  const res = parser.parse()
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
  // let input = 'if(10 > 0) {return 1;} else {return 2;}'
  // let input = 'let a = 5;'
  // let input = 'let a; a = 10;'
  // let input = 'let a = 10; 2 * a + 5;'
  // let input = 'let fn = function(x,y){return x + y;} fn(1,2);'
  let input = 'let y = 10; let fn = function(x){let y = 1; return x + y;} fn(1);'
  const ast = parse(input)
  const evaluator = new Evaluator()
  const res = evaluator.start(ast)
  print(res)
}

function test2() {
  const evaluator = new Evaluator()
  const evaluate = (input) => {
    const ast = parse(input)
    return evaluator.start(ast)
  }
  repl(evaluate, print)
}

// test1()
test2()
