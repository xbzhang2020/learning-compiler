import { NodeType } from './ast.js'
import object, { isInteger, isBoolean, isFunction, isString } from './object.js'
import builtins from './builtins.js'
import Environment from './environment.js'

export class Evaluator {
  constructor() {
    this.env = new Environment() // 顶级上下文
  }

  start(root) {
    return this.eval(root, this.env)
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
        if (env.hasOwnKey(name)) {
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
      case NodeType.FunctionLiteral: {
        const parameters = node.parameters
        const body = node.children[0]
        return new object.Function(parameters, body, env)
      }
      case NodeType.IntLiteral:
        return new object.Integer(node.value)
      case NodeType.Boolean:
        return new object.Boolean(node.value)
      case NodeType.StringLiteral:
        return new object.String(node.value)
      case NodeType.Identifier:
        return this.evalIndentifier(node, env)
      case NodeType.PrefixExpression:
        return this.evalPrefixExpression(node, env)
      case NodeType.InfixExpression:
        return this.evalInfixExpression(node, env)
      case NodeType.CallExpression:
        return this.evalCallExpression(node, env)
      default:
        return null
    }
  }

  evalPrefixExpression(node, env) {
    const operator = node.value
    const right = this.eval(node.children[0], env)

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

  evalInfixExpression(node, env) {
    const operator = node.value
    const left = this.eval(node.children[0], env)
    const right = this.eval(node.children[1], env)
    switch (operator) {
      case '+':
        if (isInteger(left) && isInteger(right)) {
          return new object.Integer(left.value + right.value)
        }
        if (isString(left) && isString(right)) {
          return new object.String(left.value + right)
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

  evalCallExpression(node, env) {
    const fn = this.eval(node.children[0], env)

    // 解析参数列表
    const args = []
    for (let i = 1; i < node.children.length; i++) {
      const arg = this.eval(node.children[i], env)
      args.push(arg)
    }

    if (!isFunction(fn)) {
      // 是否为内置函数
      if (fn && fn.type === object.ObjectType.BUILTIN_OBJ) {
        return fn.fn(...args)
      }
      throw new Error(`变量不能作为函数被调用`)
    }

    // 设置环境参数
    const enclosedEnv = new Environment(fn.env) // 注意，这里是fn的上下文
    for (let i = 0; i < fn.parameters.length; i++) {
      enclosedEnv.set(fn.parameters[i], args[i])
    }

    // 执行函数体
    return this.eval(fn.body, enclosedEnv)
  }

  evalIndentifier(node, env) {
    const name = node.value
    console.log(name)

    if (env.has(name)) {
      return env.get(name)
    }

    if (name in builtins) {
      return builtins[name]
    }
    throw new Error(`未找到变量 ${name}`)
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
