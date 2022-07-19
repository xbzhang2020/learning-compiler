// AST节点类型
export const ASTNodeType = {
  Programm: 'Programm', //程序入口，根节点

  IntDeclaration: 'IntDeclaration', //整型变量声明
  ExpressionStatement: 'ExpressionStatement', //表达式语句，即表达式后面跟个分号
  AssignmentStatement: 'AssignmentStatement', //赋值语句

  Primary: 'Primary', //基础表达式
  Multiplicative: 'Multiplicative', //乘法表达式
  Additive: 'Additive', //加法表达式

  Identifier: 'Identifier', //标识符
  IntLiteral: 'IntLiteral', //整型字面量
}

// AST节点
export class ASTNode {
  constructor(type, text) {
    this.children = []
    this.type = type
    this.text = text
  }

  appendChild(node) {
    this.children.push(node)
  }

  getChildren() {
    return this.children
  }

  static dump(node, indent = '') {
    if (!node) return
    console.log(indent + node.type + ' ' + node.text)
    node.children.forEach((item) => {
      this.dump(item, indent + '\t')
    })
  }

  traversal(cb) {
    this.postOrderTraversal(this, cb)
  }

  // 后续遍历
  postOrderTraversal(node, cb = () => null) {
    if (node) {
      node.children.forEach((item) => this.postOrderTraversal(item, cb))
      cb && cb(node)
    }
  }
}
