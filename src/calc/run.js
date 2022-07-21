import antlr4 from 'antlr4'
import MyGrammarLexer from './CalcLexer.js'
import MyGrammarParser from './CalcParser.js'
import MyGrammarVisitor from './CalcVisitor.js'

const input = `
a = 2
b = a + 2 * 3
`
const chars = new antlr4.InputStream(input)
const lexer = new MyGrammarLexer(chars)
const tokens = new antlr4.CommonTokenStream(lexer)
const parser = new MyGrammarParser(tokens)
parser.buildParseTrees = true

const tree = parser.prog()
tree.accept(new MyGrammarVisitor())
console.log(tree.toStringTree())
