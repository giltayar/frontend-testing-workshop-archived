'use strict'
const path = require('path')
const stoppable = require('stoppable')
const {describe, it, before, after} = require('mocha')
const {expect} = require('chai')
const express = require('express')
const webdriver = require('selenium-webdriver')
require('chromedriver')

const {By} = webdriver

describe('calculator app (e2e)', function () {
  let server
  before((done) => {
    const app = express()

    let tape = []

    app.use('/', (req, res, next) => console.log('static', req.url) || next(), express.static(path.join(__dirname, '/../../dist')))
    app.get('/tape', (req, res) => { res.json(tape); console.log('done get tape') })
    app.put('/tape', express.json(), (req, res) => {
      tape = req.body

      res.send('')
      console.log('done set tape')
    })

    server = stoppable(app.listen(3000, done), 0)
  })
  after((done) => console.log('closing...') || server.stop(() => console.log('closed server') || done()))

  let driver
  before(async () => {
    driver = await new webdriver.Builder().forBrowser('chrome').build()
  })
  after(async () => {
    await driver.quit()
    console.log('quit driver')
  })

  const $ = selector => driver.findElement(By.css(selector))

  it('should do calculations as expected', async () => {
    await driver.get('http://localhost:3000/')

    expect(await driver.getTitle()).to.equal('Calculator')

    expect(await (await $('.display')).getText()).to.equal('0')

    await (await $('.digit-8')).click()
    await (await $('.digit-4')).click()
    await (await $('.operator-divide')).click()
    await (await $('.digit-2')).click()
    await (await $('.operator-equals')).click()

    expect(await (await $('.display')).getText()).to.equal('42')

    const tapeLineElements = await driver.findElements(By.css('.tape-line'))

    const tapeLines = await Promise.all(tapeLineElements.map(elem => elem.getText()))

    expect(tapeLines).to.deep.equal(['84', '/', '2', '=', '42'])

    await driver.navigate().refresh()

    expect(await (await $('.display')).getText()).to.equal('0')
    expect(tapeLines).to.deep.equal(['84', '/', '2', '=', '42'])
  })
})
