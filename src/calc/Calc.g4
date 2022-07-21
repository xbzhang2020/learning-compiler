grammar Calc;

// 语法规则
prog: stat+;
stat:
	ID '=' expr NEWLINE	# exprStat
	| expr NEWLINE		# assignStat
	| NEWLINE			# blank;

expr:
	expr ('*' | '/') expr	# mul
	| expr ('+' | '-') expr	# add
	| INT					# int
	| ID					# id
	| '(' expr ')'			# parens;

// 词法规则
ID: [a-zA-Z]+;
INT: [0-9]+;
NEWLINE: '\r'? '\n'; // 语句终止标志
WS: [\t]+ -> skip;