import object, { isString } from './object.js'

export function len(arg) {
  if (isString(arg)) {
    return arg.valueOf().length
  }
}

const builtins = {
  len: new object.Builtin(len),
}

export default builtins
