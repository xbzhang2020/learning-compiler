// Generated from Hello.g4 by ANTLR 4.10.1
// jshint ignore: start
import antlr4 from 'antlr4';


const serializedATN = [4,0,3,25,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,1,0,1,0,1,0,
1,0,1,0,1,0,1,1,4,1,15,8,1,11,1,12,1,16,1,2,4,2,20,8,2,11,2,12,2,21,1,2,
1,2,0,0,3,1,1,3,2,5,3,1,0,2,1,0,97,122,3,0,9,10,13,13,32,32,26,0,1,1,0,0,
0,0,3,1,0,0,0,0,5,1,0,0,0,1,7,1,0,0,0,3,14,1,0,0,0,5,19,1,0,0,0,7,8,5,104,
0,0,8,9,5,101,0,0,9,10,5,108,0,0,10,11,5,108,0,0,11,12,5,111,0,0,12,2,1,
0,0,0,13,15,7,0,0,0,14,13,1,0,0,0,15,16,1,0,0,0,16,14,1,0,0,0,16,17,1,0,
0,0,17,4,1,0,0,0,18,20,7,1,0,0,19,18,1,0,0,0,20,21,1,0,0,0,21,19,1,0,0,0,
21,22,1,0,0,0,22,23,1,0,0,0,23,24,6,2,0,0,24,6,1,0,0,0,3,0,16,21,1,6,0,0];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class HelloLexer extends antlr4.Lexer {

    static grammarFileName = "Hello.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, "'hello'" ];
	static symbolicNames = [ null, null, "ID", "WS" ];
	static ruleNames = [ "T__0", "ID", "WS" ];

    constructor(input) {
        super(input)
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    }

    get atn() {
        return atn;
    }
}

HelloLexer.EOF = antlr4.Token.EOF;
HelloLexer.T__0 = 1;
HelloLexer.ID = 2;
HelloLexer.WS = 3;



