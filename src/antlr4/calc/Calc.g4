grammar Calc;

// 语法规则
prog: stat+;
stat:
	ID '=' expr NEWLINE	# assignStat
	| expr NEWLINE		# exprStat
	| NEWLINE			# blank;

expr:
	expr op=('*' | '/') expr	# mul
	| expr op=('+' | '-') expr	# add
	| INT					# int
	| ID					# id
	| '(' expr ')'			# parens;

// 词法规则
ID: [a-zA-Z]+;
INT: [0-9]+;
NEWLINE: '\r'? '\n'; // 语句终止标志
WS: [\t]+ -> skip;