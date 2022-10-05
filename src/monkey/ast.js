export const NodeType = {
  Program: 'Program',
  LetStatement: 'LetStatement',
  ExpressionStatement: 'ExpressionStatement',
  ReturnStatement: 'ReturnStatement',
  AssignmentStatement: 'AssignmentStatement',
  BlockStatement: 'BlockStatement',
  IfStatement: 'IfStatement',

  Expression: 'Expression',
  IntLiteral: 'IntLiteral',
  Identifier: 'Identifier',
  Boolean: 'Boolean',
  FunctionLiteral: 'FunctionLiteral',
  CallExpression: 'CallExpression',
}

export class Node {
  constructor(type, value) {
    this.children = []
    this.type = type
    this.value = value
  }

  static dump(node, indent = '') {
    if (!node) return
    console.log(indent + node.toString())
    node.children.forEach((item) => {
      this.dump(item, indent + '\t')
    })
  }

  toString() {
    return this.type + ' ' + this.value
  }
}

export class FunctionLiteralNode extends Node {
  constructor(type, value, parameters) {
    super(type, value)
    this.parameters = parameters || []
  }

  appendParameters(...args) {
    this.parameters.push(...args)
  }

  toString() {
    return `${this.type} ${this.value}(${this.parameters})`
  }
}
