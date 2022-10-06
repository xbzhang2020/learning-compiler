import { NodeType } from './ast.js'
import object, { isInteger, isBoolean } from './object.js'
import Environment from './environment.js'
export class Evaluator {
  start(root) {
    const env = new Environment()
    return this.eval(root, env)
  }

  eval(node, env) {
    if (!node) return null

    switch (node.type) {
      case NodeType.Program:
        return node.children.map((item) => this.eval(item, env))
      case NodeType.ExpressionStatement:
        return this.eval(node.children[0], env)
      case NodeType.ReturnStatement:
        return this.eval(node.children[0], env)
      case NodeType.LetStatement: {
        const res = this.eval(node.children[0], env)
        const name = node.value
        if (env.has(name)) {
          throw new Error(`重复声明变量 ${name}`)
        }
        env.set(name, res)
        return
      }
      case NodeType.AssignmentStatement: {
        const res = this.eval(node.children[0], env)
        const name = node.value
        if (!env.has(name)) {
          throw new Error(`未声明变量 ${name}`)
        }
        env.set(name, res)
        return res
      }
      case NodeType.BlockStatement:
        return this.evalBlockStatement(node, env)
      case NodeType.IfStatement:
        return this.evalIfStatement(node, env)
      case NodeType.IntLiteral:
        return new object.Integer(node.value)
      case NodeType.Boolean:
        return new object.Boolean(node.value)
      case NodeType.Identifier: {
        const name = node.value
        if (!env.has(name)) {
          throw new Error(`未找到变量 ${name}`)
        }
        return env.get(name)
      }
      case NodeType.PrefixExpression: {
        const right = this.eval(node.children[0], env)
        return this.evalPrefixExpression(node.value, right)
      }
      case NodeType.InfixExpression: {
        const left = this.eval(node.children[0], env)
        const right = this.eval(node.children[1], env)
        return this.evalInfixExpression(node.value, left, right)
      }
      default:
        return null
    }
  }

  evalPrefixExpression(operator, right) {
    switch (operator) {
      case '-':
        if (isInteger(right)) {
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

  evalBlockStatement(node, env) {
    for (let i = 0; i < node.children.length; i++) {
      const item = node.children[i]
      const res = this.eval(item, env)
      if (item.type === NodeType.ReturnStatement) {
        return res
      }
    }
    return new object.Null()
  }

  evalIfStatement(node, env) {
    const condition = this.eval(node.children[0], env)
    if (!isBoolean(condition)) {
      throw new Error('if 语句条件表达式计算失败')
    }
    if (condition.value) {
      return this.eval(node.children[1], env)
    }
    return this.eval(node.children[2], env)
  }
}

export default Evaluator
