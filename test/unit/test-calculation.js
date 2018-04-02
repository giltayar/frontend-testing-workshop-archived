'use strict'
const {describe, it} = require('mocha')
const {expect} = require('chai')

const {nextState, initialState} = require('../../src/calculator')

describe.only('calculation', function () {
  it('should show the number in display if just numbers are input', async () => {
    let s = initialState

    s = nextState(s, '4')
    s = nextState(s, '8')

    expect(s.display).to.equal('48')
  })
  it('do a simple calculation', async () => {
    let s = initialState

    s = nextState(s, '4')
    s = nextState(s, '8')
    s = nextState(s, '+')
    s = nextState(s, '4')
    s = nextState(s, '=')

    expect(s.display).to.equal('52')
  })
})
