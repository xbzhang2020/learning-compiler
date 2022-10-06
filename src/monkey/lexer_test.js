import Lexer from './lexer.js'
import repl from './repl.js'

function tokenize(input) {
  const lexer = new Lexer(input)
  lexer.tokenize()
  return lexer.tokens
}

function test1() {
  // let input = 'let age = 18;'
  // let input = 'let age1 = 24;'
  // let input = `
  // let age = 20;
  // if(age >= 18) {
  //   return true
  // } else {
  //   return false
  // }`
  let input = `"hello " + "world"`
  const res = tokenize(input)
  console.log(res)
}

function test2() {
  repl(tokenize)
}

test1()
// test2()
