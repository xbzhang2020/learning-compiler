// token 类型集合
export const TokenType = {
  // 关系运算符
  GE: 'GE', // >=
  GT: 'GT', // >
  EQ: 'EQ', // ==
  LE: 'LE', // <=
  LT: 'LT', // <

  Identifier: 'Identifier', // 标识符
  IntLiteral: 'IntLiteral', // 整型字面量
  Int: 'Int',
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
