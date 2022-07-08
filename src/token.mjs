// token 类型集合
export const TokenType = {
  GE: 'GE', // >=
  GT: 'GT', // >
  EQ: 'EQ', // ==
  LE: 'LE', // <=
  LT: 'LT', // <

  Identifier: 'Identifier', // 标识符

  NumberLiteral: 'NumberLiteral', // 整型字面量
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
