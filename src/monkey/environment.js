export default class Environment {
  constructor() {
    this.store = new Map()
  }

  get(name) {
    return this.store.get(name)
  }

  set(name, value) {
    this.store.set(name, value)
  }

  has(name) {
    return this.store.has(name)
  }
}
