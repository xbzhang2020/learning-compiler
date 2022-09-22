export const NodeType = {
  Program: 'Program',
  LetStatement: 'LetStatement',
  ExpressionStatement: 'ExpressionStatement',

  IntLiteral: 'IntLiteral',
  Identifier: 'Identifier'
}

export class Node {
  constructor(type, text) {
    this.children = []
    this.type = type
    this.text = text
  }
}
