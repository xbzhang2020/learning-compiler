# learning-compiler

学习编译原理

### 运行 antlr

```
antlr4 -Dlanguage=JavaScript  Hello.g4
antlr4 Calc.g4 -Dlanguage=JavaScript -no-listener -visitor
```

## 注意

在package.json中开启`"type": "module"`后，所有以`.js`结尾的文件会被按照esm模块解析，并且在引入时不能省略`.js`后缀,。如果要使用commonjs模块规范，需要将文件后缀名改为`.cjs`。


