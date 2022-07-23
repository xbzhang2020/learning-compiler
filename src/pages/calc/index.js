import { calc } from '../../antlr4/calc/calc.js'

function run(inputText, outputText) {
  if (!inputText || !outputText) {
    console.log('error', inputText, outputText)
    return
  }

  const input = inputText.value
  try {
    const res = calc(input)
    outputText.innerHTML = res.join('\n')
  } catch (e) {
    outputText.innerHTML = e.message
  }
}

function main() {
  const inputText = document.getElementById('input')
  const outputText = document.getElementById('output')

  const btn = document.getElementById('run-btn')
  btn.addEventListener('click', () => run(inputText, outputText))

  window.addEventListener('load', () => run(inputText, outputText))
}
main()
