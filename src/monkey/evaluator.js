import { NodeType } from './ast.js'
import object from './object.js'

export class Evaluator {
  eval(ast) {
    if (!ast) return null
    let res = null

    switch (ast.type) {
      case NodeType.Program:
        res = ast.children.map((item) => this.eval(item))
        break
      case NodeType.ExpressionStatement:
        res = this.eval(ast.children[0])
        break
      case NodeType.IntLiteral:
        res = new object.Integer(ast.value)
        break
    }

    return res
  }
}

export default Evaluator
