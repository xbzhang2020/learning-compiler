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

// 运算优先级
const Precedences = {
  LOWEST: 0,
  SUM: 1,
  PRODUCT: 2,
}

export class Parser {
  constructor(tokens) {
    this.tokens = tokens
    this.tokensReader = new TokensReader(tokens)

    this.prefixParseFns = {}
    this.infixParseFns = {}
    this.precedences = {}

    this.registerPrefixParseFn(TokenType.INT, this.parseIntLiteral)

    this.registerInfixParseFn(TokenType.PLUS, this.parseInfixExpression)
    this.registerInfixParseFn(TokenType.ASTERISK, this.parseInfixExpression)

    this.precedences[TokenType.PLUS] = Precedences.SUM
    this.precedences[TokenType.ASTERISK] = Precedences.PRODUCT
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
    Node.dump(res)
    return res
  }

  parseExpression(lastOperator = null) {
    let next = this.tokensReader.peek()
    let leftNode = null
    if (next && next.type in this.prefixParseFns) {
      const prefix = this.prefixParseFns[next.type]
      leftNode = prefix()
    }
    if (!leftNode) return null

    this.tokensReader.read()

    while (next) {
      next = this.tokensReader.peek()
      if (
        next &&
        next.type in this.infixParseFns &&
        this.greaterPrecedence(next.type, lastOperator)
      ) {
        leftNode = this.parseInfixExpression(leftNode)
      } else {
        break
      }
    }

    return leftNode
  }

  parseIntLiteral() {
    const token = this.tokensReader.peek()
    const node = new Node(NodeType.IntLiteral, token.text)
    return node
  }

  parerIndentifier() {}

  parseInfixExpression(leftNode) {
    if (!leftNode) {
      throw Error('找不到左节点')
    }
    const next = this.tokensReader.peek()
    this.tokensReader.read()

    const rightNode = this.parseExpression(next.type)

    const node = new Node(NodeType.Expression, next.text)
    node.children.push(leftNode)
    node.children.push(rightNode)
    return node
  }

  registerPrefixParseFn(tokenType, parseFn) {
    this.prefixParseFns[tokenType] = parseFn.bind(this)
  }

  registerInfixParseFn(tokenType, parseFn) {
    this.infixParseFns[tokenType] = parseFn.bind(this)
  }

  greaterPrecedence(operator, lastOperator) {
    const res = !lastOperator
      ? this.precedences[operator]
      : this.precedences[operator] - this.precedences[lastOperator]

    return res > 0
  }
}

export default Parser
