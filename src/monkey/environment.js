export default class Environment {
  constructor(outer) {
    this.store = new Map()
    this.outer = outer
  }

  get(name) {
    // 当前作用域中寻找
    if (this.store.has(name)) {
      return this.store.get(name)
    }
    // 沿着作用域链寻找
    if (this.outer) {
      return this.outer.get(name)
    }
  }

  set(name, value) {
    this.store.set(name, value)
  }

  has(name) {
    if (this.store.has(name)) {
      return this.store.has(name)
    }
    if (this.outer) {
      return this.outer.has(name)
    }
  }

  hasOwnKey(name) {
    return this.store.has(name)
  }
}
