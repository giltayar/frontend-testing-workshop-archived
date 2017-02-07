const {describe, it} = require('mocha')
const {expect} = require('chai')
const calculator = require('../../lib/calculator')

describe('calculator', function () {
  const stream = (characters, calculatorState = calculator.initialState) =>
    !characters
      ? calculatorState
      : stream(characters.slice(1),
               calculator.nextState(calculatorState, characters[0]))

  it('should show initial display correctly', () => {
    expect(calculator.initialState.display).to.equal('0')
  })
  it('should replace 0 in initialState', () => {
    expect(stream('4').display).to.equal('4')
  })

  it('should add a digit if not in initial state', () => {
    expect(stream('34').display).to.equal('34')
  })

  it('should not change display if operator appears', () => {
    expect(stream('3+').display).to.equal('3')
  })

  it('should change display to digit when digit appears after operator', () => {
    expect(stream('37+4').display).to.equal('4')
  })

  it('should compute 37+42= to be 79', () => {
    expect(stream('37+42=').display).to.equal('79')
  })

  it('should compute another expression after "="', () => {
    expect(stream('1+2=4*5=').display).to.equal('20')
  })

  it('should enabling using computation result in next computation', () => {
    expect(stream('1+2=*5=').display).to.equal('15')
  })

  it('second operator is also an equal', () => {
    expect(stream('1+2*').display).to.equal('3')
  })

  it('second operator is also an equal but it can continue after that', () => {
    expect(stream('1+2*11=').display).to.equal('33')
  })

  it('+42= should compute to 42', () => {
    expect(stream('+42=').display).to.equal('42')
  })

  it('*42= should compute to 0', () => {
    expect(stream('*42=').display).to.equal('0')
  })

  it('47-48= should compute to -1', () => {
    expect(stream('47-48=').display).to.equal('-1')
  })

  it('8/2= should compute to 4', () => {
    expect(stream('8/2=').display).to.equal('4')
  })
})
