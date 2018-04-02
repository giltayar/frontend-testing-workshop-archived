'use strict'
const {describe, it, after, before} = require('mocha')
const {expect} = require('chai')
const {JSDOM} = require('jsdom')
const React = require('react')
const ReactDOM = require('react-dom')
const nock = require('nock')
const retry = require('p-retry')
const fetch = require('node-fetch')
const CalculatorApp = require('../../src/calculator-app')

describe('calculator app (it)', function () {
  before(() => {
    const dom = new JSDOM(`<!DOCTYPE html><div id="root"></div>`)
    global.window = dom.window
    global.document = dom.window.document
    global.navigator = dom.window.navigator
    global.fetch = fetch
  })

  after(() => {
    global.window.close()

    delete global.window
    delete global.document
    delete global.navigator
  })

  it('should work as expected', async () => {
    nock('http://localhost:3001').get('/tape').reply(200, ['28', '*', '1', '=', '28'])
    ReactDOM.render(<CalculatorApp />, document.getElementById('root'))

    expect(document.querySelector('.display').textContent).to.equal('0')

    await retry(() =>
      expect([...document.querySelectorAll('.tape-line')].map(elem => elem.textContent)).to.deep.equal(['28', '*', '1', '=', '28']),
    {minTimeout: 100, maxTimeout: 1000})

    nock('http://localhost:3001').put('/tape').times(5).reply(200, ['28', '*', '1', '=', '28'])

    document.querySelector('.digit-8').click()
    document.querySelector('.digit-4').click()
    document.querySelector('.operator-divide').click()
    document.querySelector('.digit-2').click()
    document.querySelector('.operator-equals').click()

    expect(document.querySelector('.display').textContent).to.equal('42')

    expect([...document.querySelectorAll('.tape-line')].map(elem => elem.textContent)).to.deep.equal(['28', '*', '1', '=', '28', '84', '/', '2', '=', '42'])
  })
})
