// token 类型集合
const TokenType = {
  GE: 'GE', // >=
  GT: 'GT', // >
  EQ: 'EQ', // ==
  LE: 'LE', // <=
  LT: 'LT', // <

  Identifier: 'Identifier', //标识符

  NumberLiteral: 'NumberLiteral', //整型字面量
}

// Token 节点
class Token {
  constructor(type, text) {
    this.type = type
    this.text = text
  }
  appendText(c) {
    this.text += c
  }
}

// 有限自动机的状态集合
const StateType = {
  ...TokenType,
  Initial: 'Initial',
}

let token = null // 当前token 节点
let tokens = [] // token 节点列表

// 初始化状态：当第一次判断状态或前一状态，重新初始化状态
function initState(c) {
  let state = StateType.Initial

  // 清空token
  if (token) {
    tokens.push(token)
  }
  token = null

  if (isAlpha(c)) {
    token = new Token(TokenType.Identifier, c)
    state = StateType.Identifier
  }

  if (isNumber(c)) {
    token = new Token(TokenType.NumberLiteral, c)
    state = StateType.NumberLiteral
  }

  if (c == '>') {
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
    case StateType.Identifier:
      if (isAlpha(c) || isNumber(c)) {
        token.text += c
      } else {
        newState = initState(c)
      }
      break
    case StateType.NumberLiteral:
      if (isNumber(c)) {
        token.text += c
      } else {
        newState = initState(c)
      }
      break
    case StateType.GT:
      if (c === '=') {
        token.type = TokenType.GE
        token.text += c
        newState = StateType.GE
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

  console.log(tokens)
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

// 测试代码
function test1() {
  let input = 'age1 >= 18'
  tokenize(input)
}

test1()
