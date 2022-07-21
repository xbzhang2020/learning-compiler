// Generated from Calc.g4 by ANTLR 4.10.1
// jshint ignore: start
import antlr4 from 'antlr4'

// This class defines a complete generic visitor for a parse tree produced by CalcParser.

export default class CalcVisitor extends antlr4.tree.ParseTreeVisitor {
  constructor() {
    super()
    this.variables = new Map()
  }

  visitChildren(ctx) {
    if (!ctx) return

    if (ctx.children) {
      return ctx.children.map((child) => {
        if (child.children && child.children.length != 0) {
          return child.accept(this)
        } else {
          return child.getText()
        }
      })
    }
  }

  // Visit a parse tree produced by CalcParser#prog.
  visitProg(ctx) {
    const res = this.visitChildren(ctx)
    console.log('res', res)
    return res
  }

  // Visit a parse tree produced by CalcParser#exprStat.
  visitExprStat(ctx) {
    const res = this.visitChildren(ctx)
    // console.log(res)
    return res
  }

  // Visit a parse tree produced by CalcParser#assignStat.
  visitAssignStat(ctx) {
    const res = this.visitChildren(ctx)
    console.log(res)
    return res
  }

  // Visit a parse tree produced by CalcParser#blank.
  visitBlank(ctx) {
    return this.visitChildren(ctx)
  }

  // Visit a parse tree produced by CalcParser#add.
  visitAdd(ctx) {
    const [left, op, right] = this.visitChildren(ctx)
    if (op === '+') return left + right
    return left - right
  }

  // Visit a parse tree produced by CalcParser#parens.
  visitParens(ctx) {
    return this.visitChildren(ctx)
  }

  // Visit a parse tree produced by CalcParser#mul.
  visitMul(ctx) {
    const [left, op, right] = this.visitChildren(ctx)
    if (op === '*') return left * right
    return left / right
  }

  // Visit a parse tree produced by CalcParser#id.
  visitId(ctx) {
    return this.visitChildren(ctx)
  }

  // Visit a parse tree produced by CalcParser#int.
  visitInt(ctx) {
    console.log(ctx.getText())
    return Number(ctx.getText())
  }
}
