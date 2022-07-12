/**
 * 简易计算器
 */
import { SimpleLexer, TokenReader } from './simpleLexer.mjs'
import { ASTNode, ASTNodeType } from './ast.mjs'
import { TokenType } from './token.mjs'

export class SimpleCalcuator {
  constructor() {}

  /**
   * 解析变量声明语句： intDeclare -> int Identifier (= Experssion);
   * @param {*} tokens
   */
  intDeclare(tokens) {
    let node = null
    let token = tokens.peek() // 当前 token

    if (!token) return node

    if (token.type === TokenType.Int) {
      tokens.read() // 消耗int
      token = tokens.peek()
      if (token && token.type === TokenType.Identifier) {
        token.read() // 消耗标识符
        node = new ASTNode(ASTNodeType.IntDeclaration, token.text)
        token = tokens.peek()
        if (token && token.type === TokenType.Assignment) {
          tokens.read() // 消耗赋值符号=
          const child = this.additive(this.tokens)
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

      token = tokens.peek()
      if (token && token.type === TokenType.SemiColon) {
        tokens.read() // 消耗句尾分号
      } else {
        throw new Error('invalid statement, expecting semicolon')
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

    if (!node || !token) return node

    if (token.type === TokenType.Plus || token.type === TokenType.Minus) {
      tokens.read()
      const child1 = node
      const child2 = this.additive(tokens)

      if (child2) {
        node = new ASTNode(ASTNodeType.Additive, token.text)
        node.appendChild(child1)
        node.appendChild(child2)
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

    if (!node || !token) return node

    if (token.type === TokenType.Star || TokenType.Slash) {
      tokens.read()
      const child1 = node
      const child2 = this.multiplicative(tokens)

      if (child2) {
        node = new ASTNode(ASTNodeType.Multiplicative, token.text)
        node.appendChild(child1)
        node.appendChild(child2)
      } else {
        throw new Error(
          'invalid multiplicative expression, expecting the right part.'
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
   * 解析 code
   * @param {*} code 字符流
   * @returns AST语法树
   */
  parse(code) {
    const lexer = new SimpleLexer()
    const tokens = lexer.tokenize(code)
    const res = this.additive(new TokenReader(tokens))

    return res
    // // 获取后缀表达式
    // const list = []
    // if (res) {
    //   res.traversal((node) => {
    //     // console.log(node.text)
    //     list.push(node)
    //   })
    // }

    // // 计算值
    // const result = this.calcuate(list)
    // console.log(result)
  }

  /**
   * 根据后缀表达式计算
   */
  calcuate(list = []) {
    const stack = []
    list.forEach((item) => {
      if (item.type === ASTNodeType.IntLiteral) {
        stack.push(Number(item.text))
      } else if (item.type === ASTNodeType.Additive) {
        const num1 = stack.pop()
        const num2 = stack.pop()
        stack.push(num1 + num2)
      } else if (item.type === ASTNodeType.Multiplicative) {
        const num1 = stack.pop()
        const num2 = stack.pop()
        stack.push(num1 * num2)
      }
    })
    return stack.pop()
  }
}

/**
 * 测试代码
 */
function test1() {
  const parser = new SimpleCalcuator()
  parser.parse('2 + 3 * 4 + 5')
}

test1()
