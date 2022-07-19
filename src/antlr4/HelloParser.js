// Generated from Hello.g4 by ANTLR 4.10.1
// jshint ignore: start
import antlr4 from 'antlr4';
import HelloListener from './HelloListener.js';
const serializedATN = [4,1,3,6,2,0,7,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,4,0,2,
1,0,0,0,2,3,5,1,0,0,3,4,5,2,0,0,4,1,1,0,0,0,0];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class HelloParser extends antlr4.Parser {

    static grammarFileName = "Hello.g4";
    static literalNames = [ null, "'hello'" ];
    static symbolicNames = [ null, null, "ID", "WS" ];
    static ruleNames = [ "r" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = HelloParser.ruleNames;
        this.literalNames = HelloParser.literalNames;
        this.symbolicNames = HelloParser.symbolicNames;
    }

    get atn() {
        return atn;
    }



	r() {
	    let localctx = new RContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, HelloParser.RULE_r);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 2;
	        this.match(HelloParser.T__0);
	        this.state = 3;
	        this.match(HelloParser.ID);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

HelloParser.EOF = antlr4.Token.EOF;
HelloParser.T__0 = 1;
HelloParser.ID = 2;
HelloParser.WS = 3;

HelloParser.RULE_r = 0;

class RContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HelloParser.RULE_r;
    }

	ID() {
	    return this.getToken(HelloParser.ID, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HelloListener ) {
	        listener.enterR(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HelloListener ) {
	        listener.exitR(this);
		}
	}


}




HelloParser.RContext = RContext; 
