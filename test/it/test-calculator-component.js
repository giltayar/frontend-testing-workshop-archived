'use strict'
const {describe, it, after, before} = require('mocha')
const {expect} = require('chai')
const {JSDOM} = require('jsdom')
const React = require('react')
const ReactDOM = require('react-dom')
const CalculatorComponent = require('../../src/calculator-component')

describe('calculator component (it)', function () {
  before(() => {
    const dom = new JSDOM(`<!DOCTYPE html><div id="root"></div>`)
    global.window = dom.window
    global.document = dom.window.document
    global.navigator = dom.window.navigator
  })

  after(() => {
    global.window.close()

    delete global.window
    delete global.document
    delete global.navigator
  })

  it('should work as expected', async () => {
    let myTape = []
    ReactDOM.render(<CalculatorComponent onTape={tape => (myTape = myTape.concat(tape))} />, document.getElementById('root'))

    document.querySelector('.digit-8').click()
    document.querySelector('.digit-4').click()
    document.querySelector('.operator-divide').click()
    document.querySelector('.digit-2').click()
    document.querySelector('.operator-equals').click()

    expect(document.querySelector('.display').textContent).to.equal('42')

    expect(myTape).to.deep.equal(['84', '/', '2', '=', '42'])
  })
})
