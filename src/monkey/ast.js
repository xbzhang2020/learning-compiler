export const NodeType = {
  Program: 'Program',
  LetStatement: 'LetStatement',
  ReturnStatement: 'ReturnStatement',
}

export class Node {
  constructor(type, text) {
    this.children = []
    this.type = type
    this.text = text
  }
}
