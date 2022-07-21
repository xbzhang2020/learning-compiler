// Generated from Hello.g4 by ANTLR 4.10.1
// jshint ignore: start
import antlr4 from 'antlr4'

// This class defines a complete listener for a parse tree produced by HelloParser.
export default class HelloListener extends antlr4.tree.ParseTreeListener {
  // Enter a parse tree produced by HelloParser#r.
  enterR(ctx) {}

  // Exit a parse tree produced by HelloParser#r.
  exitR(ctx) {
    const value = ctx.getChild(1).getText()
    console.log(`hello, ${value}`)
  }
}
