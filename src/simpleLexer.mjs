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

// 初始化状态：当第一次判断状态或前一状态，重新初始化状态
function initState(c) {
  let state = StateType.Initial

  // 清空token
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

  if (isNumber(c)) {
    token = new Token(TokenType.IntLiteral, c)
    state = StateType.IntLiteral
  }

  if (c === '>') {
    token = new Token(TokenType.GT, c)
    state = StateType.GT
  }

  return state
}

// 状态转换机：根据当前状态和输入的字符，计算出下一时刻的状态
function transformState(state, c) {
  let newState = state

  switch (state) {
    case StateType.Initial:
      newState = initState(c)
      break
    case StateType.Identifier_int1:
      if (c === 'n') {
        newState = StateType.Identifier_int2
        token.appendText(c)
      } else if (isAlpha(c) || isNumber(c)) {
        newState = StateType.Identifier
        token.appendText(c)
      } else {
        newState = initState(c)
      }
      break
    case StateType.Identifier_int2:
      if (c === 't') {
        newState = StateType.Identifier_int3
        token.appendText(c)
      } else {
        newState = initState(c)
      }
      break
    case StateType.Identifier_int3:
      if (isBlank(c)) {
        token.type = TokenType.Int
        newState = initState(c)
      } else {
        newState = StateType.Identifier
        token.appendText(c)
      }
      break
    case StateType.Identifier:
      if (isAlpha(c) || isNumber(c)) {
        token.appendText(c)
      } else {
        newState = initState(c)
      }
      break
    case StateType.IntLiteral:
      if (isNumber(c)) {
        token.appendText(c)
      } else {
        newState = initState(c)
      }
      break
    case StateType.GT:
      if (c === '=') {
        newState = StateType.GE
        token.type = TokenType.GE
        token.appendText(c)
      }
      break
    default:
      newState = initState(c)
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
function isNumber(c) {
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
