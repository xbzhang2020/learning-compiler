// Generated from Calc.g4 by ANTLR 4.10.1
// jshint ignore: start
import antlr4 from 'antlr4'

// This class defines a complete generic visitor for a parse tree produced by CalcParser.

export default class CalcVisitor extends antlr4.tree.ParseTreeVisitor {
  // visitChildren(ctx) {
  //   if (!ctx) {
  //     return
  //   }

  //   if (ctx.children) {
  //     return ctx.children.map((child) => {
  //       if (child.children && child.children.length != 0) {
  //         return child.accept(this)
  //       } else {
  //         return child.getText()
  //       }
  //     })
  //   }
  // }

  // Visit a parse tree produced by CalcParser#prog.
  visitProg(ctx) {
    return this.visitChildren(ctx)
  }

  // Visit a parse tree produced by CalcParser#exprStat.
  visitExprStat(ctx) {
    return this.visitChildren(ctx)
  }

  // Visit a parse tree produced by CalcParser#assignStat.
  visitAssignStat(ctx) {
    return this.visitChildren(ctx)
  }

  // Visit a parse tree produced by CalcParser#blank.
  visitBlank(ctx) {
    return this.visitChildren(ctx)
  }

  // Visit a parse tree produced by CalcParser#add.
  visitAdd(ctx) {
    return this.visitChildren(ctx)
  }

  // Visit a parse tree produced by CalcParser#parens.
  visitParens(ctx) {
    return this.visitChildren(ctx)
  }

  // Visit a parse tree produced by CalcParser#mul.
  visitMul(ctx) {
    return this.visitChildren(ctx)
  }

  // Visit a parse tree produced by CalcParser#id.
  visitId(ctx) {
    return this.visitChildren(ctx)
  }

  // Visit a parse tree produced by CalcParser#int.
  visitInt(ctx) {
    return this.visitChildren(ctx)
  }
}
