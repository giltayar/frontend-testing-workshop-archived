'use strict'
const path = require('path')
const stoppable = require('stoppable')
const {describe, it, before, after} = require('mocha')
const {expect} = require('chai')
const express = require('express')
const webdriver = require('selenium-webdriver')
const {Eyes} = require('eyes.selenium')
require('chromedriver')

const {By} = webdriver

describe.only('calculator app (e2e)', function () {
  let server
  before((done) => {
    const app = express()

    let tape = []

    app.use('/', express.static(path.join(__dirname, '/../../dist')))
    app.get('/tape', (req, res) => res.json(tape))
    app.put('/tape', express.json(), (req, res) => {
      tape = req.body

      res.send('')
    })

    server = stoppable(app.listen(3000, done), 0)
  })
  after((done) => server.stop(done))

  let driver
  before(async () => {
    driver = await new webdriver.Builder().forBrowser('chrome').build()
  })
  after(async () => await driver.quit())

  let eyes
  before(async () => {
    eyes = new Eyes()

    eyes.setApiKey(process.env.APPLITOOLS_API_KEY)

    await eyes.open(driver, 'calculator app', 'calculator e2e (apr 2018)', {width: 800, height: 600})
  })
  after(async () => {
    await eyes.close()
  })

  const $ = selector => driver.findElement(By.css(selector))

  it('should do calculations as expected', async () => {
    await driver.get('http://localhost:3000/')

    expect(await driver.getTitle()).to.equal('Calculator')

    expect(await (await $('.display')).getText()).to.equal('0')
    await eyes.checkWindow('initial display')

    await (await $('.digit-8')).click()
    await (await $('.digit-4')).click()
    await (await $('.operator-divide')).click()
    await (await $('.digit-2')).click()
    await (await $('.operator-equals')).click()

    expect(await (await $('.display')).getText()).to.equal('42')

    const tapeLineElements = await driver.findElements(By.css('.tape-line'))

    const tapeLines = await Promise.all(tapeLineElements.map(elem => elem.getText()))

    expect(tapeLines).to.deep.equal(['84', '/', '2', '=', '42'])

    await eyes.checkWindow('after calculation')

    await driver.navigate().refresh()

    expect(await (await $('.display')).getText()).to.equal('0')
    expect(tapeLines).to.deep.equal(['84', '/', '2', '=', '42'])

    await eyes.checkWindow('after refresh')
  })
})
