import { NodeType } from './ast.js'
import object, { ObjectType } from './object.js'

export class Evaluator {
  eval(node) {
    if (!node) return null

    switch (node.type) {
      case NodeType.Program:
        return node.children.map((item) => this.eval(item))
      case NodeType.ExpressionStatement:
        return this.eval(node.children[0])
      case NodeType.IntLiteral:
        return new object.Integer(node.value)
      case NodeType.Boolean:
        return new object.Boolean(node.value)
      case NodeType.PrefixExpression: {
        const right = this.eval(node.children[0])
        return this.evalPrefixExpression(node.value, right)
      }
      default:
        return null
    }
  }

  evalPrefixExpression(operator, right) {
    switch (operator) {
      case '-':
        if (right && right.type === ObjectType.INTEGER_OBJ) {
          return new object.Integer(-right.value)
        }
        throw new Error('前缀表达式计算出错')
      case '!':
        if (right) {
          return new object.Boolean(false)
        }
        return new object.Boolean(true)
      default:
        throw new Error('未知的前缀运算符')
    }
  }
}

export default Evaluator
