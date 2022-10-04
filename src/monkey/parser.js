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
  EQUALS: 1,
  LESSGREATER: 2,
  SUM: 3,
  PRODUCT: 4,
  PREFIX: 5,
}

export class Parser {
  constructor(tokens) {
    this.tokens = tokens
    this.tokensReader = new TokensReader(tokens)

    this.prefixParseFns = {}
    this.infixParseFns = {}
    this.precedences = {}

    this.registerPrefixParseFn(TokenType.INT, this.parseIntegerLiteral)
    this.registerPrefixParseFn(TokenType.IDENTIFIER, this.parerIndentifier)
    this.registerPrefixParseFn(TokenType.TRUE, this.parseBoolean)
    this.registerPrefixParseFn(TokenType.FALSE, this.parseBoolean)
    this.registerPrefixParseFn(TokenType.MINUS, this.parsePrefixExpression)
    this.registerPrefixParseFn(TokenType.BANG, this.parsePrefixExpression)
    this.registerPrefixParseFn(TokenType.LPAREN, this.parseGroupExpression)

    this.registerInfixParseFn(TokenType.PLUS, this.parseInfixExpression)
    this.registerInfixParseFn(TokenType.ASTERISK, this.parseInfixExpression)
    this.registerInfixParseFn(TokenType.MINUS, this.parseInfixExpression)
    this.registerInfixParseFn(TokenType.SLASH, this.parseInfixExpression)
    this.registerInfixParseFn(TokenType.EQUAL, this.parseInfixExpression)
    this.registerInfixParseFn(TokenType.NOT_EQUAL, this.parseInfixExpression)
    this.registerInfixParseFn(TokenType.LT, this.parseInfixExpression)
    this.registerInfixParseFn(TokenType.GT, this.parseInfixExpression)
    this.registerInfixParseFn(TokenType.LT_EQUAL, this.parseInfixExpression)
    this.registerInfixParseFn(TokenType.GT_EQUAL, this.parseInfixExpression)

    this.precedences[TokenType.PLUS] = Precedences.SUM
    this.precedences[TokenType.MINUS] = Precedences.SUM
    this.precedences[TokenType.ASTERISK] = Precedences.PRODUCT
    this.precedences[TokenType.SLASH] = Precedences.PRODUCT
    this.precedences[TokenType.EQUAL] = Precedences.EQUALS
    this.precedences[TokenType.NOT_EQUAL] = Precedences.EQUALS
    this.precedences[TokenType.LT] = Precedences.LESSGREATER
    this.precedences[TokenType.GT] = Precedences.LESSGREATER
    this.precedences[TokenType.LT_EQUAL] = Precedences.LESSGREATER
    this.precedences[TokenType.GT_EQUAL] = Precedences.LESSGREATER
  }

  parse() {
    const res = this.parseProgram()
    return res
  }

  parseProgram() {
    const node = new Node(NodeType.Program, null)
    while (this.tokensReader.peek()) {
      let child = null

      switch (this.tokensReader.peek().type) {
        case TokenType.LET:
          child = this.parseLetStatement()
          break
        default:
          child = this.parseExpressionStatement()
      }

      if (child) {
        node.children.push(child)
      } else {
        this.tokensReader.read()
      }
    }
    return node
  }

  parseLetStatement() {
    // 消耗 let 关键字
    const node = new Node(NodeType.LetStatement, null)

    this.tokensReader.read()
    let next = this.tokensReader.peek()

    if (next && next.type === TokenType.IDENTIFIER) {
      // 消耗标识符
      node.value = next.text
      this.tokensReader.read()
      next = this.tokensReader.peek()
      if (next && next.type === TokenType.ASSIGNMENT) {
        this.tokensReader.read()
        const exp = this.parseExpression()
        if (exp) {
          node.children.push(exp)
        } else {
          throw new Error('声明语句初始化失败，等号右侧缺失表达式')
        }
      }
    } else {
      throw new Error('声明语句缺失变量名')
    }

    next = this.tokensReader.peek()
    if (next && next.type === TokenType.SEMICOLON) {
      this.tokensReader.read()
    } else {
      throw new Error('声明语句缺失分号')
    }

    return node
  }

  parseExpressionStatement() {
    const node = new Node(NodeType.ExpressionStatement, null)
    const exp = this.parseExpression()
    if (exp) {
      node.children.push(exp)
    }

    const next = this.tokensReader.peek()
    if (next && next.type === TokenType.SEMICOLON) {
      this.tokensReader.read()
    }
    return node
  }

  parseExpression(curPrecedence = Precedences.LOWEST) {
    // 解析左节点
    let leftNode = null
    let next = this.tokensReader.peek()
    if (next && next.type in this.prefixParseFns) {
      const prefix = this.prefixParseFns[next.type]
      leftNode = prefix()
    }
    if (!leftNode) return null

    while (this.tokensReader.peek()) {
      next = this.tokensReader.peek()
      if (
        next &&
        next.type !== TokenType.SEMICOLON &&
        next.type in this.infixParseFns &&
        this.greaterPrecedence(this.precedences[next.type], curPrecedence)
      ) {
        leftNode = this.parseInfixExpression(leftNode)
      } else {
        break
      }
    }

    return leftNode
  }

  parseIntegerLiteral() {
    const token = this.tokensReader.read()
    const node = new Node(NodeType.IntLiteral, token.text)
    return node
  }

  parerIndentifier() {
    const token = this.tokensReader.read()
    const node = new Node(NodeType.Identifier, token.text)
    return node
  }

  parseBoolean() {
    const token = this.tokensReader.read()
    const node = new Node(NodeType.Boolean, token.text)
    return node
  }

  parsePrefixExpression() {
    const token = this.tokensReader.read()
    const node = new Node(NodeType.Expression, token.type)
    const leftNode = this.parseExpression(Precedences.PREFIX)

    if (!leftNode) {
      throw new Error('前缀表达式缺失左节点')
    }
    node.children.push(leftNode)
    return node
  }

  parseInfixExpression(leftNode) {
    if (!leftNode) {
      throw Error('中缀表达式缺失左节点')
    }
    const token = this.tokensReader.read()
    const rightNode = this.parseExpression(this.precedences[token.type])

    const node = new Node(NodeType.Expression, token.text)
    node.children.push(leftNode)
    node.children.push(rightNode)
    return node
  }

  parseGroupExpression() {
    this.tokensReader.read()
    const exp = this.parseExpression()
    const next = this.tokensReader.peek()
    if (next && next.type === TokenType.RPAREN) {
      this.tokensReader.read()
    } else {
      throw new Error('分组表达式缺失右括号')
    }
    return exp
  }

  registerPrefixParseFn(tokenType, parseFn) {
    this.prefixParseFns[tokenType] = parseFn.bind(this)
  }

  registerInfixParseFn(tokenType, parseFn) {
    this.infixParseFns[tokenType] = parseFn.bind(this)
  }

  greaterPrecedence(precedence, curPrecedence) {
    const res = precedence - curPrecedence
    return res > 0
  }
}

export default Parser
