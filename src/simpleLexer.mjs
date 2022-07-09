/**
 * 简易词法分析器
 */
import { Token, TokenType } from './token.mjs'

// 有限自动机的状态集合
const StateType = {
  ...TokenType,
  Initial: 'Initial',
  Identifier_int1: 'Identifier_int1',
  Identifier_int2: 'Identifier_int2',
  Identifier_int3: 'Identifier_int3',
}

// 判断字符是否是字母
function isAlpha(c) {
  const temp = c.toLowerCase()
  return 'a' <= temp && 'z' >= temp
}

// 判断字符是否是数字
function isDigit(c) {
  return '0' <= c && '9' >= c
}

// 判断是否为空
function isBlank(c) {
  return ' ' === c
}

export class SimpleLexer {
  constructor() {
    this.tokens = [] // token列表
    this.token = null // 当前token节点
  }

  /**
   * 初始化 token
   * @param {*} c 当前字符
   * @returns 初始化后的状态
   */
  initToken(c) {
    let state = StateType.Initial

    // 将之前的token添加到tokens列表中
    if (this.token) {
      this.tokens.push(this.token)
      this.token = null
    }

    if (isAlpha(c)) {
      if (c === 'i') {
        this.token = new Token(TokenType.Int, c)
        state = StateType.Identifier_int1
      } else {
        this.token = new Token(TokenType.Identifier, c)
        state = StateType.Identifier
      }
    } else if (isDigit(c)) {
      this.token = new Token(TokenType.IntLiteral, c)
      state = StateType.IntLiteral
    } else if (c === '>') {
      this.token = new Token(TokenType.GT, c)
      state = StateType.GT
    } else if (c === '=') {
      this.token = new Token(TokenType.Assignment, c)
      state = StateType.Assignment
    } else if (c === '+') {
      this.token = new Token(TokenType.Plus, c)
      state = StateType.Plus
    } else if (c === '-') {
      this.token = new Token(TokenType.Minus, c)
      state = StateType.Minus
    } else if (c === '*') {
      this.token = new Token(TokenType.Star, c)
      state = StateType.Star
    } else if (c === '/') {
      this.token = new Token(TokenType.Slash, c)
      state = StateType.Slash
    } else if (c === '(') {
      this.token = new Token(TokenType.LeftParen, c)
      state = StateType.LeftParen
    } else if (c === ')') {
      this.token = new Token(TokenType.RightParen, c)
      state = StateType.RightParen
    }

    return state
  }

  /**
   * 状态转换机：根据当前状态和输入的字符，计算出下一时刻的状态
   * @param {*} state 当前状态
   * @param {*} c 输入的字符
   * @returns 下一时刻的状态
   */
  transformState(state, c) {
    let newState = state

    switch (state) {
      case StateType.Initial:
        newState = this.initToken(c)
        break
      case StateType.Identifier:
        if (isAlpha(c) || isDigit(c)) {
          this.token.appendText(c)
        } else {
          newState = this.initToken(c)
        }
        break
      case StateType.IntLiteral:
        if (isDigit(c)) {
          this.token.appendText(c)
        } else {
          newState = this.initToken(c)
        }
        break
      case StateType.GT:
        if (c === '=') {
          newState = StateType.GE
          this.token.type = TokenType.GE
          this.token.appendText(c)
        }
        break
      case StateType.Identifier_int1:
        if (c === 'n') {
          newState = StateType.Identifier_int2
          this.token.appendText(c)
        } else if (isAlpha(c) || isDigit(c)) {
          newState = StateType.Identifier
          this.token.appendText(c)
        } else {
          newState = this.initToken(c)
        }
        break
      case StateType.Identifier_int2:
        if (c === 't') {
          newState = StateType.Identifier_int3
          this.token.appendText(c)
        } else {
          newState = this.initToken(c)
        }
        break
      case StateType.Identifier_int3:
        if (isBlank(c)) {
          newState = this.initToken(c)
        } else {
          newState = StateType.Identifier
          this.token.type = TokenType.Identifier
          this.token.appendText(c)
        }
        break
      default:
        newState = this.initToken(c)
    }

    return newState
  }

  // token 序列化
  tokenize(data) {
    let state = StateType.Initial
    for (const c of data) {
      state = this.transformState(state, c)
    }

    if (this.token) {
      this.tokens.push(this.token)
    }

    return this.tokens
  }

  static printTokens(tokens) {
    for (const item of tokens) {
      console.log(item.type, item.text)
    }
  }
}

/**
 * 测试代码
 */
function test1() {
  let input = 'age1 >= 18'
  const lexer = new SimpleLexer()
  const res = lexer.tokenize(input)
  console.log(res)
}

function test2() {
  let input = 'int age = 18'
  const lexer = new SimpleLexer()
  const res = lexer.tokenize(input)
  SimpleLexer.printTokens(res)
}

function test3() {
  let input = '2*3+4'
  const lexer = new SimpleLexer()
  const res = lexer.tokenize(input)
  console.log(res)
}

function test4() {
  let input = '2*(3+4)'
  const lexer = new SimpleLexer()
  const res = lexer.tokenize(input)
  console.log(res)
}

test4()
