import { TokenType } from './token.js'
import { Node, NodeType, FunctionLiteralNode } from './ast.js'

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

  unread() {
    if (this.pos <= 0) return null
    const res = this.tokens[this.pos]
    this.pos--
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
  CALL: 6,
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
    this.registerPrefixParseFn(TokenType.FUNCTION, this.parseFunctionLiteral)

    this.registerInfixParseFn(TokenType.PLUS, this.parseInfixExpression, Precedences.SUM)
    this.registerInfixParseFn(TokenType.MINUS, this.parseInfixExpression, Precedences.SUM)
    this.registerInfixParseFn(TokenType.ASTERISK, this.parseInfixExpression, Precedences.PRODUCT)
    this.registerInfixParseFn(TokenType.SLASH, this.parseInfixExpression, Precedences.PRODUCT)
    this.registerInfixParseFn(TokenType.EQUAL, this.parseInfixExpression, Precedences.EQUALS)
    this.registerInfixParseFn(TokenType.NOT_EQUAL, this.parseInfixExpression, Precedences.EQUALS)
    this.registerInfixParseFn(TokenType.LT, this.parseInfixExpression, Precedences.LESSGREATER)
    this.registerInfixParseFn(TokenType.GT, this.parseInfixExpression, Precedences.LESSGREATER)
    this.registerInfixParseFn(TokenType.LT_EQUAL, this.parseInfixExpression, Precedences.LESSGREATER)
    this.registerInfixParseFn(TokenType.GT_EQUAL, this.parseInfixExpression, Precedences.LESSGREATER)
    this.registerInfixParseFn(TokenType.LPAREN, this.parseCallExpression, Precedences.CALL)
  }

  parse() {
    const res = this.parseProgram()
    return res
  }

  parseProgram() {
    const node = new Node(NodeType.Program, '')
    while (this.tokensReader.peek()) {
      const child = this.parseStatement()
      if (child) {
        node.children.push(child)
      } else {
        const token = this.tokensReader.read()
        console.log('构造 AST 失败：', token.text)
      }
    }
    return node
  }

  parseStatement() {
    switch (this.tokensReader.peek().type) {
      case TokenType.LET:
        return this.parseLetStatement()
      case TokenType.RETURN:
        return this.parseReturnStatement()
      case TokenType.LBRACE:
        return this.parseBlockStatement()
      case TokenType.IF:
        return this.parseIfStatement()
      case TokenType.IDENTIFIER:
        return this.parseAssignmentStatement() || this.parseExpressionStatement()
      default:
        return this.parseExpressionStatement()
    }
  }

  parseLetStatement() {
    // 消耗 let 关键字
    const node = new Node(NodeType.LetStatement, '')

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
          throw new Error('let 声明语句初始化失败，等号右侧缺失表达式或表达式解析失败')
        }
      }
    } else {
      throw new Error('let 声明语句缺失变量名')
    }

    next = this.tokensReader.peek()
    if (next && next.type === TokenType.SEMICOLON) {
      this.tokensReader.read()
    }

    return node
  }

  parseExpressionStatement() {
    const exp = this.parseExpression()

    if (!exp) return null

    const node = new Node(NodeType.ExpressionStatement, '')
    node.children.push(exp)

    const next = this.tokensReader.peek()
    if (next && next.type === TokenType.SEMICOLON) {
      this.tokensReader.read()
    }
    return node
  }

  parseReturnStatement() {
    const node = new Node(NodeType.ReturnStatement, '')
    this.tokensReader.read()

    const exp = this.parseExpression()
    if (!exp) {
      throw new Error('return 语句缺失表达式')
    }
    node.children.push(exp)

    const next = this.tokensReader.peek()
    if (next && next.type === TokenType.SEMICOLON) {
      this.tokensReader.read()
    } else {
      throw new Error('return 语句缺失分号')
    }
    return node
  }

  parseAssignmentStatement() {
    let node = null
    const token = this.tokensReader.read()
    let next = this.tokensReader.peek()

    if (next && next.type === TokenType.ASSIGNMENT) {
      node = new Node(NodeType.AssignmentStatement, token.text)
      this.tokensReader.read()
      const exp = this.parseExpression()
      if (!exp) {
        throw new Error('赋值语句缺失表达式')
      }
      node.children.push(exp)

      next = this.tokensReader.peek()
      if (next && next.type === TokenType.SEMICOLON) {
        this.tokensReader.read()
      } else {
        throw new Error('赋值语句缺失分号')
      }
    } else {
      this.tokensReader.unread()
    }

    return node
  }

  parseBlockStatement() {
    const node = new Node(NodeType.BlockStatement, '')
    this.tokensReader.read()

    while (this.tokensReader.peek()) {
      if (this.tokensReader.peek().type === TokenType.RBARCE) {
        this.tokensReader.read()
        break
      }

      const child = this.parseStatement()
      if (!child) {
        throw new Error('块语句解析失败')
      }
      node.children.push(child)
    }

    return node
  }

  parseIfStatement() {
    const node = new Node(NodeType.IfStatement, '')
    this.tokensReader.read()

    let next = this.tokensReader.peek()
    if (!next || next.type !== TokenType.LPAREN) {
      throw new Error('if 语句缺失左括号')
    }

    this.tokensReader.read()
    const condition = this.parseExpression()
    if (!condition) {
      throw new Error('if 语句缺失条件表达式')
    }
    node.children.push(condition)

    next = this.tokensReader.peek()
    if (!next || next.type !== TokenType.RPAREN) {
      throw new Error('if 语句缺失右括号')
    }
    this.tokensReader.read()

    next = this.tokensReader.peek()
    if (!next || next.type !== TokenType.LBRACE) {
      throw new Error('if 语句缺失块语句')
    }

    const block = this.parseBlockStatement()
    node.children.push(block)

    // 可选的else
    next = this.tokensReader.peek()
    if (next && next.type === TokenType.ELSE) {
      this.tokensReader.read()
      next = this.tokensReader.peek()

      if (next && next.type === TokenType.LBRACE) {
        const block = this.parseBlockStatement()
        node.children.push(block)
      } else if (next && next.type === TokenType.IF) {
        const stat = this.parseIfStatement()
        node.children.push(stat)
      } else {
        throw new Error('else 语句解析错误')
      }
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
        const infix = this.infixParseFns[next.type]
        leftNode = infix(leftNode)
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

  parseFunctionLiteral() {
    this.tokensReader.read()
    const node = new FunctionLiteralNode(NodeType.FunctionLiteral, '', [])

    let next = this.tokensReader.peek()
    if (next && next.type === TokenType.LPAREN) {
      const paramters = this.parseFunctionParameters()
      node.appendParameters(...paramters)
    } else {
      throw new Error('函数缺失参数列表')
    }

    next = this.tokensReader.peek()
    if (next && next.type === TokenType.LBRACE) {
      const block = this.parseBlockStatement()
      node.children.push(block)
    } else {
      throw new Error('函数缺失函数体')
    }
    return node
  }

  parseFunctionParameters() {
    const paramters = []
    this.tokensReader.read()
    let next = this.tokensReader.peek()

    while (next && next.type !== TokenType.RPAREN) {
      const token = this.tokensReader.read()
      if (token.type === TokenType.IDENTIFIER) {
        paramters.push(token.text)
      } else {
        throw Error('函数参数列表解析失败')
      }

      next = this.tokensReader.peek()
      if (next && next.type === TokenType.COMMA) {
        this.tokensReader.read()
        next = this.tokensReader.peek()
      } else {
        break
      }
    }

    if (next && next.type === TokenType.RPAREN) {
      this.tokensReader.read()
    } else {
      throw new Error('函数参数列表缺失右括号')
    }

    return paramters
  }

  parseCallExpression(leftNode) {
    if (!leftNode) {
      throw Error('函数调用表达式缺失函数名')
    }
    const node = new Node(NodeType.CallExpression, '')
    node.children.push(leftNode)

    const args = this.parseCallArguments()
    node.children.push(...args)

    return node
  }

  parseCallArguments() {
    const args = []
    this.tokensReader.read()
    let next = this.tokensReader.peek()

    while (next && next.type !== TokenType.RPAREN) {
      const exp = this.parseExpression()
      if (exp) {
        args.push(exp)
      }

      next = this.tokensReader.peek()
      if (next && next.type === TokenType.COMMA) {
        this.tokensReader.read()
        next = this.tokensReader.peek()
      } else {
        break
      }
    }

    if (next && next.type === TokenType.RPAREN) {
      this.tokensReader.read()
    } else {
      throw new Error('函数调用参数列表缺失右括号')
    }

    return args
  }

  registerPrefixParseFn(tokenType, parseFn) {
    this.prefixParseFns[tokenType] = parseFn.bind(this)
  }

  registerInfixParseFn(tokenType, parseFn, precedence) {
    this.infixParseFns[tokenType] = parseFn.bind(this)
    this.precedences[tokenType] = precedence
  }

  greaterPrecedence(precedence, curPrecedence) {
    const res = precedence - curPrecedence
    return res > 0
  }
}

export default Parser
