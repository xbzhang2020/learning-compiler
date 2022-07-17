/**
 * 简易脚本语言
 */
import { SimpleLexer, TokenReader } from './simpleLexer.mjs'
import { ASTNode, ASTNodeType } from './ast.mjs'
import { TokenType } from './token.mjs'

/**
 * REPL
 */
async function repl() {
  const readline = await import('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  })

  const parser = new SimpleParser()
  function evaluate(line) {
    const res = parser.evaluate(line)
    console.log(res)
  }

  rl.prompt()

  rl.on('line', (line) => {
    evaluate(line)
    rl.prompt()
  }).on('close', () => {
    console.log('Bye!')
    process.exit(0)
  })
}
repl()

export class VariableMap {
  constructor() {
    this.variables = new Map() // 变量存储区
  }

  get(key) {
    if (key in this.variables) {
      return this.variables[key]
    } else {
      throw Error('unknown variable: ' + key)
    }
  }

  set(key, value) {
    this.variables[key] = value
  }
}

export class SimpleParser {
  constructor() {
    this.variables = new VariableMap()
  }

  /**
   * 解析 code
   * @param {*} code 字符流
   * @returns AST语法树
   */
  parse(code) {
    const lexer = new SimpleLexer()
    const tokens = lexer.tokenize(code)
    const ast = this.program(new TokenReader(tokens))
    // ASTNode.dump(ast)
    return ast
  }

  /**
   * 解析语句的根入口
   * @param {*} tokens
   * @returns
   */
  program(tokens) {
    const node = new ASTNode(ASTNodeType.Programm, '')
    while (tokens.peek()) {
      let child = this.intDeclare(tokens)

      if (!child) {
        child = this.expressionStatement(tokens)
      }

      if (!child) {
        child = this.assignmentStatement(tokens)
      }

      if (child) {
        node.appendChild(child)
      } else {
        throw new Error('unknown statement')
      }
    }
    return node
  }

  /**
   * 解析表达式语句
   * @param {*} tokens
   * @returns
   */
  expressionStatement(tokens) {
    // 表达式语句和赋值语句右相同前缀的情况，可能解析失败，因此需要回溯
    // age + 10; age = age + 10;
    let pos = tokens.getPos()
    let node = this.additive(tokens)

    let token = tokens.peek() // 当前 token
    if (node && token && token.type === TokenType.SemiColon) {
      tokens.read() // 消耗句尾分号
      const child = node
      node = new ASTNode(ASTNodeType.ExpressionStatement, '')
      node.appendChild(child)
    } else {
      node = null
      tokens.setPos(pos) // 回溯
    }

    return node
  }

  /**
   * 解析变量声明语句： IntDeclaration -> 'int' Identifier ('=' Expression)?';'
   * @param {*} tokens
   */
  intDeclare(tokens) {
    let node = null
    let token = tokens.peek() // 当前 token

    if (token && token.type === TokenType.Int) {
      tokens.read() // 消耗int
      token = tokens.peek()
      if (token && token.type === TokenType.Identifier) {
        tokens.read() // 消耗标识符
        node = new ASTNode(ASTNodeType.IntDeclaration, token.text)
        token = tokens.peek()
        if (token && token.type === TokenType.Assignment) {
          tokens.read() // 消耗赋值符号
          const child = this.additive(tokens) // 解析表达式
          if (child) {
            node.appendChild(child)
          } else {
            throw new Error(
              'invalide variable initialization, expecting an expression'
            )
          }
        }
      } else {
        throw new Error('variable name expected')
      }
    }

    if (node) {
      token = tokens.peek()
      if (token && token.type === TokenType.SemiColon) {
        tokens.read() // 消耗句尾分号
      } else {
        throw new Error('invalid declaration statement, expecting semicolon')
      }
    }

    return node
  }

  /**
   * 解析赋值语句
   * @param {*} tokens
   * @returns
   */
  assignmentStatement(tokens) {
    let node = null
    let token = tokens.peek()

    if (token && token.type === TokenType.Identifier) {
      tokens.read()
      node = new ASTNode(ASTNodeType.AssignmentStatement, token.text)
      token = tokens.peek()
      if (token && token.type === TokenType.Assignment) {
        tokens.read() // 消耗赋值符号
        const child = this.additive(tokens) // 解析表达式
        if (child) {
          node.appendChild(child)

          token = tokens.peek()
          if (token && token.type === TokenType.SemiColon) {
            tokens.read() // 消耗句尾分号
          } else {
            throw new Error('invalid assign statement, expecting semicolon')
          }
        } else {
          throw new Error(
            'invalide variable initialization, expecting an expression'
          )
        }
      } else {
        tokens.unread()
        node = null
      }
    }

    return node
  }

  /**
   * 解析加法表达式：additive -> multiplicative (+ additive)*
   * @param {*} tokens token序列读取器
   * @returns ASTNode
   */
  additive(tokens) {
    let node = this.multiplicative(tokens)
    let token = tokens.peek() // 当前 token

    // 循环算法，保证了结合性
    let child1 = node
    while (
      child1 &&
      token &&
      (token.type === TokenType.Plus || token.type === TokenType.Minus)
    ) {
      tokens.read()
      const child2 = this.multiplicative(tokens)
      if (child2) {
        node = new ASTNode(ASTNodeType.Multiplicative, token.text)
        node.appendChild(child1)
        node.appendChild(child2)
        child1 = node
        token = tokens.peek()
      } else {
        throw new Error(
          'invalid additive expression, expecting the right part.'
        )
      }
    }

    return node
  }

  /**
   * 解析乘法表达式：multiplicative -> primary | primary * multiplicative
   * @param {*} tokens token序列读取器
   * @returns ASTNode
   */
  multiplicative(tokens) {
    let node = this.primary(tokens)
    let token = tokens.peek() // 当前token

    // 循环算法，保证了结合性
    let child1 = node
    while (
      child1 &&
      token &&
      (token.type === TokenType.Star || token.type === TokenType.Slash)
    ) {
      tokens.read()
      const child2 = this.primary(tokens)
      if (child2) {
        node = new ASTNode(ASTNodeType.Additive, token.text)
        node.appendChild(child1)
        node.appendChild(child2)
        child1 = node
        token = tokens.peek()
      } else {
        throw new Error(
          'invalid additive expression, expecting the right part.'
        )
      }
    }

    return node
  }

  /**
   * 解析基础表达式：primary -> Num | Identifier | (add)
   * @param {*} tokens token序列读取器
   * @returns ASTNode
   */
  primary(tokens) {
    let node = null
    let token = tokens.peek() // 当前 token

    if (!token) return node

    if (token.type === TokenType.IntLiteral) {
      tokens.read()
      node = new ASTNode(ASTNodeType.IntLiteral, token.text)
    } else if (token.type === TokenType.Identifier) {
      tokens.read()
      node = new ASTNode(ASTNodeType.Identifier, token.text)
    } else if (token.type === TokenType.LeftParen) {
      tokens.read()
      node = this.additive(tokens)

      if (!node) {
        throw new Error('expecting an additive expression inside parenthesis')
      }

      token = tokens.peek()
      if (token && token.type === TokenType.RightParen) {
        tokens.read()
      } else {
        throw new Error('expecting right parenthesis')
      }
    }
    return node
  }

  /**
   * 计算表达式
   * @param {*} code
   * @returns
   */
  evaluate(code) {
    const ast = this.parse(code)
    return this.evaluateAST(ast)
  }

  /**
   * 执行语法树
   * @param {*} ast 语法树
   * @returns 计算结果
   */
  evaluateAST(ast) {
    if (!ast) return
    let result = null

    switch (ast.type) {
      case ASTNodeType.Programm:
        result = []
        ast.getChildren().forEach((item) => {
          const value = this.evaluateAST(item)
          result.push(value)
        })
        break
      case ASTNodeType.ExpressionStatement:
        result = this.evaluateAST(ast.getChildren()[0])
        break
      case ASTNodeType.IntLiteral:
        result = Number(ast.text)
        break
      case ASTNodeType.Additive:
        {
          const value1 = this.evaluateAST(ast.getChildren()[0])
          const value2 = this.evaluateAST(ast.getChildren()[1])
          if (ast.text === '-') {
            result = value1 - value2
          } else {
            result = value1 + value2
          }
        }
        break
      case ASTNodeType.Multiplicative:
        {
          const value1 = this.evaluateAST(ast.getChildren()[0])
          const value2 = this.evaluateAST(ast.getChildren()[1])
          if (ast.text === '/') {
            result = value1 / value2
          } else {
            result = value1 * value2
          }
        }
        break
    }
    return result
  }
}
