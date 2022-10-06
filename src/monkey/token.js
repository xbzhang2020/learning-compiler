export const TokenType = {
  ILLEGAL: 'ILLEGAL',
  EOF: 'EOF',

  IDENTIFIER: 'IDENTIFIER', // 标识符
  INT: 'INT', // 整型
  STRING: 'STRING', // 字符串

  // 运算符
  ASSIGNMENT: '=',
  PLUS: '+',
  MINUS: '-',
  BANG: '!',
  ASTERISK: '*',
  SLASH: '/',

  LT: '<',
  GT: '>',

  EQUAL: '==',
  NOT_EQUAL: '!=',
  LT_EQUAL: '<=',
  GT_EQUAL: '>=',

  // 分隔符
  COMMA: ',',
  SEMICOLON: ';',

  LPAREN: '(',
  RPAREN: ')',
  LBRACE: '{',
  RBARCE: '}',

  // 关键字
  LET: 'LET',
  FUNCTION: 'FUNCTION',
  TRUE: 'TRUE',
  FALSE: 'FALSE',
  IF: 'IF',
  ELSE: 'ELSE',
  FOR: 'FOR',
  RETURN: 'RETURN',
}

export class Token {
  constructor(type, text) {
    this.type = type
    this.text = text
  }

  appendText(c) {
    this.text += c
  }
}
