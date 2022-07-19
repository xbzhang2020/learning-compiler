var countValidWords = function (sentence) {
  const tokens = sentence.split(' ')
  const reg = /^([a-z]+(\-[a-z]+)?)?[!,\.]?$/
  return tokens.reduce((res, cur) => {
    if (reg.test(cur)) {
      console.log(cur)
      res++
    }
    return res
  }, 0)
}

let str = 'he bought 2 pencils, 3 erasers, and 1  pencil-sharpener.'
console.log(countValidWords(str))
