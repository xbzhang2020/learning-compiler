export const ObjectType = {
  NULL_OBJ: 'NULL',
  INTEGER_OBJ: 'INTEGER',
  BOOLEAN_OBJ: 'BOOLEAN',
  STRING_OBJ: 'STRING',

  ERROR_OBJ: 'ERROR',
  FUNCTION_OBJ: 'FUNCTION',
  BUILTIN_OBJ: 'BUILTIN',
}

export class BaseObject {
  constructor(type, value) {
    this.type = type
    this.value = value
  }

  toString() {
    return this.value
  }

  valueOf() {
    return this.value
  }
}

export function isInteger(value) {
  return value && value.type === ObjectType.INTEGER_OBJ
}

export function isBoolean(value) {
  return value && value.type === ObjectType.BOOLEAN_OBJ
}

export function isFunction(value) {
  return value && value.type === ObjectType.FUNCTION_OBJ
}

export function isString(value) {
  return value && value.type === ObjectType.STRING_OBJ
}

class Integer extends BaseObject {
  constructor(value) {
    super(ObjectType.INTEGER_OBJ, Number(value))
  }
}

class Boolean extends BaseObject {
  constructor(value) {
    super(ObjectType.BOOLEAN_OBJ, value)
  }
}

class String extends BaseObject {
  constructor(value) {
    super(ObjectType.STRING_OBJ, value)
  }
}

class Null extends BaseObject {
  constructor() {
    super(ObjectType.NULL_OBJ, null)
  }
}

export class Builtin extends BaseObject {
  constructor(fn) {
    super(ObjectType.BUILTIN_OBJ, null)
    this.fn = fn
  }
}

class Function extends BaseObject {
  constructor(parameters, body, env) {
    super(ObjectType.FUNCTION_OBJ, null)
    this.parameters = parameters || []
    this.body = body
    this.env = env
  }
}

export default {
  ObjectType,
  Object: BaseObject,
  Integer,
  Boolean,
  String,
  Null,
  Function,
  Builtin,
}
