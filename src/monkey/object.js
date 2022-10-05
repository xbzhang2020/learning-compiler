export const ObjectType = {
  NULL_OBJ: 'NULL',
  INTEGER_OBJ: 'INTEGER',
  BOOLEAN_OBJ: 'BOOLEAN',

  ERROR_OBJ: 'ERROR',
  FUNCTION_OBJ: 'FUNCTION',
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

class Null extends BaseObject {
  constructor(value) {
    super(ObjectType.NULL_OBJ, value)
  }
}

export default {
  Object: BaseObject,
  Integer,
  Boolean,
  Null,
}
