/**
 * 简易计算器
 */
import { SimpleLexer, TokenReader } from './simpleLexer.mjs'
import { ASTNode, ASTNodeType } from './ast.mjs'
import { TokenType } from './token.mjs'

export class SimpleCalcuator {
  constructor() {}

  initDelcareaction(tokens) {}

  /**
   * 解析加法表达式
   * @param {*} tokens token序列读取器
   * @returns ASTNode
   */
  additive(tokens) {
    let node = this.multiplicative(tokens)
    let token = tokens.peek() // 当前 token
    if (node && token && token.type === TokenType.Plus) {
      token = tokens.read()
      const child1 = node
      const child2 = this.additive(tokens)
      if (child2) {
        node = new ASTNode(ASTNodeType.Additive, token.text)
        node.children.push(child1, child2)
      } else {
        throw new Error(
          'invalid additive expression, expecting the right part.'
        )
      }
    }

    return node
  }

  /**
   * 解析乘法表达式
   * @param {*} tokens token序列读取器
   * @returns ASTNode
   */
  multiplicative(tokens) {
    let node = this.primary(tokens)
    let token = tokens.peek() // 当前token

    if (node && token && token.type === TokenType.Star) {
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

    return node
  }

  /**
   * 解析基础表达式
   * @param {*} tokens token序列读取器
   * @returns ASTNode
   */
  primary(tokens) {
    let node = null
    let token = tokens.peek()

    if (token) {
      if (token.type === TokenType.IntLiteral) {
        token = tokens.read()
        node = new ASTNode(ASTNodeType.IntLiteral, token.text)
      } else if (token.type === TokenType.Identifier) {
        token = tokens.read()
        node = new ASTNode(ASTNodeType.Identifier, token.text)
      }
    }
    return node
  }

  parse(code) {
    const lexer = new SimpleLexer()
    this.tokens = new TokenReader(lexer.tokenize(code))
    const res = this.additive(this.tokens)
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
  parser.parse('2 + 3 * 4')
}

test1()
