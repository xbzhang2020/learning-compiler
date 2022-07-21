import antlr4 from 'antlr4'
import MyGrammarLexer from './CalcLexer.js'
import MyGrammarParser from './CalcParser.js'
import MyGrammarVisitor from './CalcVisitor.js'

const input = `
2 + 3 * 4 + (5 + 6)
`
const chars = new antlr4.InputStream(input)
const lexer = new MyGrammarLexer(chars)
const tokens = new antlr4.CommonTokenStream(lexer)
const parser = new MyGrammarParser(tokens)
parser.buildParseTrees = true

const tree = parser.prog()
tree.accept(new MyGrammarVisitor())
