// Token 类型集合
export const TokenType = {
  // 关系运算符
  GE: 'GE', // >=
  GT: 'GT', // >
  EQ: 'EQ', // ==
  LE: 'LE', // <=
  LT: 'LT', // <

  // 数学运算
  Plus: 'Plus',
  Minus: 'Minus',
  Star: 'Star',
  Slash: 'Slash',

  Identifier: 'Identifier', // 标识符
  IntLiteral: 'IntLiteral', // 整型字面量
  Assignment: 'Assignment',

  Int: 'Int',

  LeftParen: 'LeftParen', // (
  RightParen: 'LeftParen', // )
  SemiColon: 'SemiColon', // ;
}

// Token 节点
export class Token {
  constructor(type, text) {
    this.type = type
    this.text = text
  }

  appendText(c) {
    this.text += c
  }
}
