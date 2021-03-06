// Generated from Calc.g4 by ANTLR 4.10.1
// jshint ignore: start
import antlr4 from 'antlr4'
import CalcVisitor from './CalcVisitor.js'

const serializedATN = [
  4, 1, 11, 43, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 1, 0, 4, 0, 8, 8, 0, 11, 0,
  12, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 21, 8,
  1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 3, 2, 30, 8, 2, 1, 2, 1, 2, 1, 2,
  1, 2, 1, 2, 1, 2, 5, 2, 38, 8, 2, 10, 2, 12, 2, 41, 9, 2, 1, 2, 0, 1, 4, 3, 0,
  2, 4, 0, 2, 1, 0, 2, 3, 1, 0, 4, 5, 46, 0, 7, 1, 0, 0, 0, 2, 20, 1, 0, 0, 0,
  4, 29, 1, 0, 0, 0, 6, 8, 3, 2, 1, 0, 7, 6, 1, 0, 0, 0, 8, 9, 1, 0, 0, 0, 9, 7,
  1, 0, 0, 0, 9, 10, 1, 0, 0, 0, 10, 1, 1, 0, 0, 0, 11, 12, 5, 8, 0, 0, 12, 13,
  5, 1, 0, 0, 13, 14, 3, 4, 2, 0, 14, 15, 5, 10, 0, 0, 15, 21, 1, 0, 0, 0, 16,
  17, 3, 4, 2, 0, 17, 18, 5, 10, 0, 0, 18, 21, 1, 0, 0, 0, 19, 21, 5, 10, 0, 0,
  20, 11, 1, 0, 0, 0, 20, 16, 1, 0, 0, 0, 20, 19, 1, 0, 0, 0, 21, 3, 1, 0, 0, 0,
  22, 23, 6, 2, -1, 0, 23, 30, 5, 9, 0, 0, 24, 30, 5, 8, 0, 0, 25, 26, 5, 6, 0,
  0, 26, 27, 3, 4, 2, 0, 27, 28, 5, 7, 0, 0, 28, 30, 1, 0, 0, 0, 29, 22, 1, 0,
  0, 0, 29, 24, 1, 0, 0, 0, 29, 25, 1, 0, 0, 0, 30, 39, 1, 0, 0, 0, 31, 32, 10,
  5, 0, 0, 32, 33, 7, 0, 0, 0, 33, 38, 3, 4, 2, 6, 34, 35, 10, 4, 0, 0, 35, 36,
  7, 1, 0, 0, 36, 38, 3, 4, 2, 5, 37, 31, 1, 0, 0, 0, 37, 34, 1, 0, 0, 0, 38,
  41, 1, 0, 0, 0, 39, 37, 1, 0, 0, 0, 39, 40, 1, 0, 0, 0, 40, 5, 1, 0, 0, 0, 41,
  39, 1, 0, 0, 0, 5, 9, 20, 29, 37, 39,
]

const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN)

const decisionsToDFA = atn.decisionToState.map(
  (ds, index) => new antlr4.dfa.DFA(ds, index)
)

const sharedContextCache = new antlr4.PredictionContextCache()

export default class CalcParser extends antlr4.Parser {
  static grammarFileName = 'Calc.g4'
  static literalNames = [null, "'='", "'*'", "'/'", "'+'", "'-'", "'('", "')'"]
  static symbolicNames = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    'ID',
    'INT',
    'NEWLINE',
    'WS',
  ]
  static ruleNames = ['prog', 'stat', 'expr']

  constructor(input) {
    super(input)
    this._interp = new antlr4.atn.ParserATNSimulator(
      this,
      atn,
      decisionsToDFA,
      sharedContextCache
    )
    this.ruleNames = CalcParser.ruleNames
    this.literalNames = CalcParser.literalNames
    this.symbolicNames = CalcParser.symbolicNames
  }

  get atn() {
    return atn
  }

  sempred(localctx, ruleIndex, predIndex) {
    switch (ruleIndex) {
      case 2:
        return this.expr_sempred(localctx, predIndex)
      default:
        throw 'No predicate with index:' + ruleIndex
    }
  }

  expr_sempred(localctx, predIndex) {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 5)
      case 1:
        return this.precpred(this._ctx, 4)
      default:
        throw 'No predicate with index:' + predIndex
    }
  }

  prog() {
    let localctx = new ProgContext(this, this._ctx, this.state)
    this.enterRule(localctx, 0, CalcParser.RULE_prog)
    var _la = 0 // Token type
    try {
      this.enterOuterAlt(localctx, 1)
      this.state = 7
      this._errHandler.sync(this)
      _la = this._input.LA(1)
      do {
        this.state = 6
        this.stat()
        this.state = 9
        this._errHandler.sync(this)
        _la = this._input.LA(1)
      } while (
        (_la & ~0x1f) == 0 &&
        ((1 << _la) &
          ((1 << CalcParser.T__5) |
            (1 << CalcParser.ID) |
            (1 << CalcParser.INT) |
            (1 << CalcParser.NEWLINE))) !==
          0
      )
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }

  stat() {
    let localctx = new StatContext(this, this._ctx, this.state)
    this.enterRule(localctx, 2, CalcParser.RULE_stat)
    try {
      this.state = 20
      this._errHandler.sync(this)
      var la_ = this._interp.adaptivePredict(this._input, 1, this._ctx)
      switch (la_) {
        case 1:
          localctx = new AssignStatContext(this, localctx)
          this.enterOuterAlt(localctx, 1)
          this.state = 11
          this.match(CalcParser.ID)
          this.state = 12
          this.match(CalcParser.T__0)
          this.state = 13
          this.expr(0)
          this.state = 14
          this.match(CalcParser.NEWLINE)
          break

        case 2:
          localctx = new ExprStatContext(this, localctx)
          this.enterOuterAlt(localctx, 2)
          this.state = 16
          this.expr(0)
          this.state = 17
          this.match(CalcParser.NEWLINE)
          break

        case 3:
          localctx = new BlankContext(this, localctx)
          this.enterOuterAlt(localctx, 3)
          this.state = 19
          this.match(CalcParser.NEWLINE)
          break
      }
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }

  expr(_p) {
    if (_p === undefined) {
      _p = 0
    }
    const _parentctx = this._ctx
    const _parentState = this.state
    let localctx = new ExprContext(this, this._ctx, _parentState)
    let _prevctx = localctx
    const _startState = 4
    this.enterRecursionRule(localctx, 4, CalcParser.RULE_expr, _p)
    var _la = 0 // Token type
    try {
      this.enterOuterAlt(localctx, 1)
      this.state = 29
      this._errHandler.sync(this)
      switch (this._input.LA(1)) {
        case CalcParser.INT:
          localctx = new IntContext(this, localctx)
          this._ctx = localctx
          _prevctx = localctx

          this.state = 23
          this.match(CalcParser.INT)
          break
        case CalcParser.ID:
          localctx = new IdContext(this, localctx)
          this._ctx = localctx
          _prevctx = localctx
          this.state = 24
          this.match(CalcParser.ID)
          break
        case CalcParser.T__5:
          localctx = new ParensContext(this, localctx)
          this._ctx = localctx
          _prevctx = localctx
          this.state = 25
          this.match(CalcParser.T__5)
          this.state = 26
          this.expr(0)
          this.state = 27
          this.match(CalcParser.T__6)
          break
        default:
          throw new antlr4.error.NoViableAltException(this)
      }
      this._ctx.stop = this._input.LT(-1)
      this.state = 39
      this._errHandler.sync(this)
      var _alt = this._interp.adaptivePredict(this._input, 4, this._ctx)
      while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          if (this._parseListeners !== null) {
            this.triggerExitRuleEvent()
          }
          _prevctx = localctx
          this.state = 37
          this._errHandler.sync(this)
          var la_ = this._interp.adaptivePredict(this._input, 3, this._ctx)
          switch (la_) {
            case 1:
              localctx = new MulContext(
                this,
                new ExprContext(this, _parentctx, _parentState)
              )
              this.pushNewRecursionContext(
                localctx,
                _startState,
                CalcParser.RULE_expr
              )
              this.state = 31
              if (!this.precpred(this._ctx, 5)) {
                throw new antlr4.error.FailedPredicateException(
                  this,
                  'this.precpred(this._ctx, 5)'
                )
              }
              this.state = 32
              localctx.op = this._input.LT(1)
              _la = this._input.LA(1)
              if (!(_la === CalcParser.T__1 || _la === CalcParser.T__2)) {
                localctx.op = this._errHandler.recoverInline(this)
              } else {
                this._errHandler.reportMatch(this)
                this.consume()
              }
              this.state = 33
              this.expr(6)
              break

            case 2:
              localctx = new AddContext(
                this,
                new ExprContext(this, _parentctx, _parentState)
              )
              this.pushNewRecursionContext(
                localctx,
                _startState,
                CalcParser.RULE_expr
              )
              this.state = 34
              if (!this.precpred(this._ctx, 4)) {
                throw new antlr4.error.FailedPredicateException(
                  this,
                  'this.precpred(this._ctx, 4)'
                )
              }
              this.state = 35
              localctx.op = this._input.LT(1)
              _la = this._input.LA(1)
              if (!(_la === CalcParser.T__3 || _la === CalcParser.T__4)) {
                localctx.op = this._errHandler.recoverInline(this)
              } else {
                this._errHandler.reportMatch(this)
                this.consume()
              }
              this.state = 36
              this.expr(5)
              break
          }
        }
        this.state = 41
        this._errHandler.sync(this)
        _alt = this._interp.adaptivePredict(this._input, 4, this._ctx)
      }
    } catch (error) {
      if (error instanceof antlr4.error.RecognitionException) {
        localctx.exception = error
        this._errHandler.reportError(this, error)
        this._errHandler.recover(this, error)
      } else {
        throw error
      }
    } finally {
      this.unrollRecursionContexts(_parentctx)
    }
    return localctx
  }
}

CalcParser.EOF = antlr4.Token.EOF
CalcParser.T__0 = 1
CalcParser.T__1 = 2
CalcParser.T__2 = 3
CalcParser.T__3 = 4
CalcParser.T__4 = 5
CalcParser.T__5 = 6
CalcParser.T__6 = 7
CalcParser.ID = 8
CalcParser.INT = 9
CalcParser.NEWLINE = 10
CalcParser.WS = 11

CalcParser.RULE_prog = 0
CalcParser.RULE_stat = 1
CalcParser.RULE_expr = 2

class ProgContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1
    }
    super(parent, invokingState)
    this.parser = parser
    this.ruleIndex = CalcParser.RULE_prog
  }

  stat = function (i) {
    if (i === undefined) {
      i = null
    }
    if (i === null) {
      return this.getTypedRuleContexts(StatContext)
    } else {
      return this.getTypedRuleContext(StatContext, i)
    }
  }

  accept(visitor) {
    if (visitor instanceof CalcVisitor) {
      return visitor.visitProg(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

class StatContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1
    }
    super(parent, invokingState)
    this.parser = parser
    this.ruleIndex = CalcParser.RULE_stat
  }

  copyFrom(ctx) {
    super.copyFrom(ctx)
  }
}

class BlankContext extends StatContext {
  constructor(parser, ctx) {
    super(parser)
    super.copyFrom(ctx)
  }

  NEWLINE() {
    return this.getToken(CalcParser.NEWLINE, 0)
  }

  accept(visitor) {
    if (visitor instanceof CalcVisitor) {
      return visitor.visitBlank(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

CalcParser.BlankContext = BlankContext

class ExprStatContext extends StatContext {
  constructor(parser, ctx) {
    super(parser)
    super.copyFrom(ctx)
  }

  expr() {
    return this.getTypedRuleContext(ExprContext, 0)
  }

  NEWLINE() {
    return this.getToken(CalcParser.NEWLINE, 0)
  }

  accept(visitor) {
    if (visitor instanceof CalcVisitor) {
      return visitor.visitExprStat(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

CalcParser.ExprStatContext = ExprStatContext

class AssignStatContext extends StatContext {
  constructor(parser, ctx) {
    super(parser)
    super.copyFrom(ctx)
  }

  ID() {
    return this.getToken(CalcParser.ID, 0)
  }

  expr() {
    return this.getTypedRuleContext(ExprContext, 0)
  }

  NEWLINE() {
    return this.getToken(CalcParser.NEWLINE, 0)
  }

  accept(visitor) {
    if (visitor instanceof CalcVisitor) {
      return visitor.visitAssignStat(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

CalcParser.AssignStatContext = AssignStatContext

class ExprContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1
    }
    super(parent, invokingState)
    this.parser = parser
    this.ruleIndex = CalcParser.RULE_expr
  }

  copyFrom(ctx) {
    super.copyFrom(ctx)
  }
}

class AddContext extends ExprContext {
  constructor(parser, ctx) {
    super(parser)
    this.op = null // Token;
    super.copyFrom(ctx)
  }

  expr = function (i) {
    if (i === undefined) {
      i = null
    }
    if (i === null) {
      return this.getTypedRuleContexts(ExprContext)
    } else {
      return this.getTypedRuleContext(ExprContext, i)
    }
  }

  accept(visitor) {
    if (visitor instanceof CalcVisitor) {
      return visitor.visitAdd(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

CalcParser.AddContext = AddContext

class ParensContext extends ExprContext {
  constructor(parser, ctx) {
    super(parser)
    super.copyFrom(ctx)
  }

  expr() {
    return this.getTypedRuleContext(ExprContext, 0)
  }

  accept(visitor) {
    if (visitor instanceof CalcVisitor) {
      return visitor.visitParens(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

CalcParser.ParensContext = ParensContext

class MulContext extends ExprContext {
  constructor(parser, ctx) {
    super(parser)
    this.op = null // Token;
    super.copyFrom(ctx)
  }

  expr = function (i) {
    if (i === undefined) {
      i = null
    }
    if (i === null) {
      return this.getTypedRuleContexts(ExprContext)
    } else {
      return this.getTypedRuleContext(ExprContext, i)
    }
  }

  accept(visitor) {
    if (visitor instanceof CalcVisitor) {
      return visitor.visitMul(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

CalcParser.MulContext = MulContext

class IdContext extends ExprContext {
  constructor(parser, ctx) {
    super(parser)
    super.copyFrom(ctx)
  }

  ID() {
    return this.getToken(CalcParser.ID, 0)
  }

  accept(visitor) {
    if (visitor instanceof CalcVisitor) {
      return visitor.visitId(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

CalcParser.IdContext = IdContext

class IntContext extends ExprContext {
  constructor(parser, ctx) {
    super(parser)
    super.copyFrom(ctx)
  }

  INT() {
    return this.getToken(CalcParser.INT, 0)
  }

  accept(visitor) {
    if (visitor instanceof CalcVisitor) {
      return visitor.visitInt(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

CalcParser.IntContext = IntContext

CalcParser.ProgContext = ProgContext
CalcParser.StatContext = StatContext
CalcParser.ExprContext = ExprContext
