/**
 * 简易计算器
 */
import { SimpleLexer, TokenReader } from './simpleLexer.mjs'
import { ASTNode, ASTNodeType } from './ast.mjs'
import { TokenType } from './token.mjs'

export class SimpleCalcuator {
  constructor() {
    this.node = null
    // this.tokens = null // token 序列读取器
  }

  initDelcareaction(tokens) {}

  additive(tokens) {
    return null
  }

  multiplicative(tokens) {
    let node = null
    let token = tokens.peek() // 当前token
    if (token) {
      if (token.type === TokenType.IntLiteral) {
        token = tokens.read()
        node = new ASTNode(ASTNodeType.IntLiteral, token.text)

        token = tokens.peek()
        if (token && token.type === TokenType.Star) {
          token = tokens.read()
          const child1 = node
          const child2 = this.multiplicative(tokens)
          if (child2) {
            node = new ASTNode(ASTNodeType.Multiplicative, token.text)
            node.children.push(child1, child2)
          } else {
            throw new Error(
              'invalid multiplicative expression, expecting the right part.'
            )
          }
        }
      }
    }

    return node
  }

  parse(code) {
    const lexer = new SimpleLexer()
    this.tokens = new TokenReader(lexer.tokenize(code))
    const res = this.multiplicative(this.tokens)
    if (res) {
      res.traversal((node) => console.log(node.text))
    }
    // console.log(res)
  }
}

/**
 * 测试代码
 */
function test1() {
  const parser = new SimpleCalcuator()
  parser.parse('2 * 3 * 4')
}

test1()
