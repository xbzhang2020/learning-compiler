import antlr4 from 'antlr4'
import MyGrammarLexer from './HelloLexer.js'
import MyGrammarParser from './HelloParser.js'
// import MyGrammarListener from './HelloListener.js'

const input = 'your text to parse here'
const chars = new antlr4.InputStream(input)
const lexer = new MyGrammarLexer(chars)
const tokens = new antlr4.CommonTokenStream(lexer)
const parser = new MyGrammarParser(tokens)
parser.buildParseTrees = true

// 解析规则
const tree = parser.r()
