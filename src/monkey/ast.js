export const NodeType = {
  Program: 'Program',
  LetStatement: 'LetStatement',
  ExpressionStatement: 'ExpressionStatement',

  IntLiteral: 'IntLiteral',
  Identifier: 'Identifier',
  Expression: 'Expression',
}

export class Node {
  constructor(type, value) {
    this.children = []
    this.type = type
    this.value = value
  }

  static dump(node, indent = '') {
    if (!node) return
    console.log(indent + node.type + ' ' + node.value)
    node.children.forEach((item) => {
      this.dump(item, indent + '\t')
    })
  }
}
