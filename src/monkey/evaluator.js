import { NodeType } from './ast.js'
import object, { ObjectType, isInteger } from './object.js'

export class Evaluator {
  eval(node) {
    if (!node) return null

    switch (node.type) {
      case NodeType.Program:
        return node.children.map((item) => this.eval(item))
      case NodeType.ExpressionStatement:
        return this.eval(node.children[0])
      case NodeType.ReturnStatement:
        return this.eval(node.children[0])
      case NodeType.BlockStatement:
        return this.evalBlockStatement(node)
      case NodeType.IntLiteral:
        return new object.Integer(node.value)
      case NodeType.Boolean:
        return new object.Boolean(node.value)
      case NodeType.PrefixExpression: {
        const right = this.eval(node.children[0])
        return this.evalPrefixExpression(node.value, right)
      }
      case NodeType.InfixExpression: {
        const left = this.eval(node.children[0])
        const right = this.eval(node.children[1])
        return this.evalInfixExpression(node.value, left, right)
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
        throw new Error('前缀表达式计算失败')
      case '!':
        if (right) {
          return new object.Boolean(false)
        }
        return new object.Boolean(true)
      default:
        throw new Error(`未知的前缀运算符：${operator}`)
    }
  }

  evalInfixExpression(operator, left, right) {
    switch (operator) {
      case '+':
        if (isInteger(left) && isInteger(right)) {
          return new object.Integer(left.value + right.value)
        }
        throw new Error('中缀表达式计算失败')
      case '-':
        if (isInteger(left) && isInteger(right)) {
          return new object.Integer(left - right)
        }
        throw new Error('中缀表达式计算失败')
      case '*':
        if (isInteger(left) && isInteger(right)) {
          return new object.Integer(left * right)
        }
        throw new Error('中缀表达式计算失败')
      case '/':
        if (isInteger(left) && isInteger(right)) {
          return new object.Integer(left / right)
        }
        throw new Error('中缀表达式计算失败')
      case '==':
        return new object.Boolean(left.value === right.value)
      case '!=':
        return new object.Boolean(left.value !== right.value)
      case '<':
        return new object.Boolean(left.value < right.value)
      case '>':
        return new object.Boolean(left.value > right.value)
      case '<=':
        return new object.Boolean(left.value <= right.value)
      case '>=':
        return new object.Boolean(left.value >= right.value)
      default:
        throw new Error(`未知的中缀运算符：${operator}`)
    }
  }

  evalBlockStatement(node) {
    for (let i = 0; i < node.children.length; i++) {
      const item = node.children[i]
      const res = this.eval(item)
      if (item.type === NodeType.ReturnStatement) {
        return res
      }
    }
    return new object.Null()
  }
}

export default Evaluator
