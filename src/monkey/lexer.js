import { Token, TokenType } from './token.js'

function isLetter(c) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_'
}

function isDigit(c) {
  return c && c >= '0' && c <= '9'
}

function isBlank(c) {
  return c === ' ' || c === '\n' || c === '\t' || c === '\r'
}

const keywordsMap = {
  let: TokenType.LET,
  function: TokenType.FUNCTION,
  if: TokenType.IF,
  else: TokenType.ELSE,
  for: TokenType.FOR,
  true: TokenType.TRUE,
  false: TokenType.FALSE,
  return: TokenType.RETURN,
}

class Lexer {
  constructor(input) {
    this.input = input
    this.pos = 0
    this.tokens = []
  }

  tokenize() {
    while (this.pos < this.input.length) {
      const token = this.nextToken()
      if (token) {
        this.tokens.push(token)
      }
    }
    return this.tokens
  }

  nextToken() {
    let token = null
    let c = this.readChar()
    if (c === null) return null

    switch (c) {
      case '+':
        token = new Token(TokenType.PLUS, c)
        break
      case '-':
        token = new Token(TokenType.MINUS, c)
        break
      case '*':
        token = new Token(TokenType.ASTERISK, c)
        break
      case '/':
        token = new Token(TokenType.SLASH, c)
        break
      case '!':
        if (this.peekChar() === '=') {
          token = new Token(TokenType.NOT_EQUAL, c)
          token.appendText(this.readChar())
        } else {
          token = new Token(TokenType.BANG, c)
        }
        break
      case '=':
        if (this.peekChar() === '=') {
          token = new Token(TokenType.EQUAL, c)
          token.appendText(this.readChar())
        } else {
          token = new Token(TokenType.ASSIGNMENT, c)
        }
        break
      case '<':
        if (this.peekChar() === '=') {
          token = new Token(TokenType.LT_EQUAL, c)
          token.appendText(this.readChar())
        } else {
          token = new Token(TokenType.LT, c)
        }
        break
      case '>':
        if (this.peekChar() === '=') {
          token = new Token(TokenType.GT_EQUAL, c)
          token.appendText(this.readChar())
        } else {
          token = new Token(TokenType.GT, c)
        }
        break
      case '(':
        token = new Token(TokenType.LPAREN, c)
        break
      case ')':
        token = new Token(TokenType.RPAREN, c)
        break
      case '{':
        token = new Token(TokenType.LBRACE, c)
        break
      case '}':
        token = new Token(TokenType.RBARCE, c)
        break
      case ',':
        token = new Token(TokenType.COMMA, c)
        break
      case ';':
        token = new Token(TokenType.SEMICOLON, c)
        break
      default:
        if (isBlank(c)) {
          this.skipWhitespace()
        } else if (isLetter(c)) {
          token = new Token(TokenType.IDENTIFIER, c)
          let next = this.peekChar()
          while (isLetter(next) || isDigit(next)) {
            token.appendText(this.readChar())
            next = this.peekChar()
          }
          // 判断是否为关键字
          if (keywordsMap[token.text]) {
            token.type = keywordsMap[token.text]
          }
        } else if (isDigit(c)) {
          token = new Token(TokenType.INT, c)
          let next = this.peekChar()
          while (isDigit(next)) {
            token.appendText(this.readChar())
            next = this.peekChar()
          }
        } else {
          token = new Token(TokenType.ILLEGAL, c)
        }
    }

    return token
  }

  readChar() {
    if (this.pos >= this.input.length) return null
    const res = this.input[this.pos]
    this.pos++
    return res
  }

  peekChar() {
    if (this.pos >= this.input.length) return null
    return this.input[this.pos]
  }

  skipWhitespace() {}
}

export default Lexer
