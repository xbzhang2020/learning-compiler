import { TokenType } from './token.js'
import { Node, NodeType } from './ast.js'

export class TokensReader {
  constructor(tokens) {
    this.tokens = tokens
    this.pos = 0
  }

  read() {
    if (this.pos >= this.tokens.length) return null
    const res = this.tokens[this.pos]
    this.pos++
    return res
  }

  peek() {
    if (this.pos >= this.tokens.length) return null
    return this.tokens[this.pos]
  }
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens
    this.tokensReader = new TokensReader(tokens)
  }

  parse() {
    const res = this.parseProgram()
    return res
  }

  parseProgram() {
    const node = new Node(NodeType.Program, null)
    while (this.tokensReader.peek() !== null) {
      let child = null

      switch (this.tokensReader.peek().type) {
        // case TokenType.LET:
        //   child = this.parseLetStatement()
        //   break
        default:
          child = this.parseExpressionStatement()
      }

      if (child) {
        node.children.push(child)
      }

      this.tokensReader.read()
    }
    return node
  }

  parseLetStatement(tokens) {
    // 消耗 let 关键词
    tokens.read()
    let node = null
    let next = tokens.peek()

    if (next && next.type === TokenType.IDENTIFIER) {
      // 消耗标识符
      tokens.read()
      node = new Node(NodeType.LetStatement, next.text)
      next = tokens.peek()
      if (next && next.type === TokenType.ASSIGNMENT) {
        // 消耗 =
        tokens.read()
        next = tokens.peek()
        if (next) {
          // 解析表达式
        } else {
          throw new Error(
            'invalide variable initialization, expecting an expression'
          )
        }
      }
    } else {
      throw new Error('variable name expected')
    }
    return node
  }

  parseExpressionStatement() {
    const res = this.parseExpression()
    // console.log('expression', res)
    return res
  }

  parseExpression() {
    // 解析左节点
    let leftNode = null
    const next = this.tokensReader.peek()
    if (next && next.type === TokenType.INT) {
      leftNode = this.parseIntLiteral(next)
    } else if (next && next.type === TokenType.IDENTIFIER) {
      leftNode = this.parerIndentifier(next)
    }

    if (!leftNode) return

    return leftNode
  }

  parseIntLiteral(token) {
    const node = new Node(NodeType.IntLiteral, token.text)
    return node
  }

  parerIndentifier(token) {
    const node = new Node(NodeType.Identifier, token.text)
    return node
  }
}

export default Parser