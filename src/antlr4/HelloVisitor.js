// Generated from Hello.g4 by ANTLR 4.10.1
// jshint ignore: start
import antlr4 from 'antlr4'

// This class defines a complete generic visitor for a parse tree produced by HelloParser.

export default class HelloVisitor extends antlr4.tree.ParseTreeVisitor {
  // Visit a parse tree produced by HelloParser#r.
  visitR(ctx) {
    return this.visitChildren(ctx)
  }
}
