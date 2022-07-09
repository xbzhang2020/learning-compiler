import { Token, TokenType } from './token.mjs'

// 有限自动机的状态集合
const StateType = {
  ...TokenType,
  Initial: 'Initial',
  Identifier_int1: 'Identifier_int1',
  Identifier_int2: 'Identifier_int2',
  Identifier_int3: 'Identifier_int3',
}

let token = null // 当前token 节点
const tokens = [] // token 节点列表

/**
 * 初始化 token
 * @param {*} c 当前字符
 * @returns 初始化后的状态
 */
function initToken(c) {
  let state = StateType.Initial

  // 将之前的token添加到tokens列表中
  if (token) {
    tokens.push(token)
    token = null
  }

  if (isAlpha(c)) {
    token = new Token(TokenType.Identifier, c)
    if (c === 'i') {
      state = StateType.Identifier_int1
    } else {
      state = StateType.Identifier
    }
  }

  if (isDigit(c)) {
    token = new Token(TokenType.IntLiteral, c)
    state = StateType.IntLiteral
  }

  if (c === '>') {
    token = new Token(TokenType.GT, c)
    state = StateType.GT
  }

  if (c === '=') {
    token = new Token(TokenType.Assignment, c)
    state = StateType.Assignment
  }

  return state
}

/**
 * 状态转换机：根据当前状态和输入的字符，计算出下一时刻的状态
 * @param {*} state 当前状态
 * @param {*} c 输入的字符
 * @returns 下一时刻的状态
 */
function transformState(state, c) {
  let newState = state

  switch (state) {
    case StateType.Initial:
      newState = initToken(c)
      break
    case StateType.Identifier:
      if (isAlpha(c) || isDigit(c)) {
        token.appendText(c)
      } else {
        newState = initToken(c)
      }
      break
    case StateType.IntLiteral:
      if (isDigit(c)) {
        token.appendText(c)
      } else {
        newState = initToken(c)
      }
      break
    case StateType.GT:
      if (c === '=') {
        newState = StateType.GE
        token.type = TokenType.GE
        token.appendText(c)
      }
      break
    case StateType.Identifier_int1:
      if (c === 'n') {
        newState = StateType.Identifier_int2
        token.appendText(c)
      } else if (isAlpha(c) || isDigit(c)) {
        newState = StateType.Identifier
        token.appendText(c)
      } else {
        newState = initToken(c)
      }
      break
    case StateType.Identifier_int2:
      if (c === 't') {
        newState = StateType.Identifier_int3
        token.appendText(c)
      } else {
        newState = initToken(c)
      }
      break
    case StateType.Identifier_int3:
      if (isBlank(c)) {
        token.type = TokenType.Int
        newState = initToken(c)
      } else {
        newState = StateType.Identifier
        token.appendText(c)
      }
      break
    default:
      newState = initToken(c)
  }

  return newState
}

// token 序列化
function tokenize(data) {
  let state = StateType.Initial
  for (const c of data) {
    state = transformState(state, c)
  }

  if (token) {
    tokens.push(token)
  }

  return tokens
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

// 测试代码
function test1() {
  let input = 'age1 >= 18'
  tokenize(input)
}

function test2() {
  let input = 'int age = 10'
  const res = tokenize(input)
  console.log(res)
}

test2()
