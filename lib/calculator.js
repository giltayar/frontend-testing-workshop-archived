module.exports.nextState = (calculatorState, character) => {
  if (isDigit(character)) {
    return addDigit(calculatorState, character)
  } else if (isOperator(character)) {
    return addOperator(calculatorState, character)
  } else if (isEqualSign(character)) {
    return compute(calculatorState)
  } else {
    return calculatorState
  }
}

module.exports.initialState = {display: '0', initial: true}

module.exports.simpleState = number => ({display: String(number)})

const isDigit = character =>
  character >= '0' && character <= '9'

const isOperator = character =>
  !!OPERATORS[character]

const isEqualSign = character =>
  character === '='

const addDigit = (calculatorState, character) => {
  if (calculatorState.initial) {
    return Object.assign(
      {},
      calculatorState,
      {display: character, initial: false, previousOperand: parseInt(calculatorState.display)})
  } else {
    return Object.assign({}, calculatorState, {display: calculatorState.display + character})
  }
}

const addOperator = (calculatorState, character) => {
  if (!calculatorState.operator || calculatorState.initial) {
    return Object.assign({}, calculatorState, {operator: character, initial: true})
  } else {
    return compute(calculatorState)
  }
}

const compute = calculatorState =>
  Object.assign({},
    !calculatorState.operator
      ? calculatorState
      : {
        display:
          String(
            OPERATORS[calculatorState.operator](calculatorState.previousOperand, parseInt(calculatorState.display)))
      },
      {initial: true})

const OPERATORS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
}
