'use strict'
const path = require('path')
const {describe, it, before, after} = require('mocha')
const {expect} = require('chai')
const express = require('express')
const puppeteer = require('puppeteer')

describe('calculator app (e2e)', function () {
  let server
  before((done) => {
    const app = express()

    app.use('/', express.static(path.join(__dirname, '/../../dist')))

    server = app.listen(3000, done)
  })

  after((done) => server.close(done))

  let browser
  let page
  before(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  })
  after(async () => {
    await browser.close()
  })

  it('should do calculations as expected', async () => {
    await page.goto('http://localhost:3000/')

    expect(await page.title()).to.equal('Calculator')

    expect(await page.$eval('.display', elem => elem.textContent)).to.equal('0')

    await (await page.$('.digit-8')).click()
    await (await page.$('.digit-4')).click()
    await (await page.$('.operator-divide')).click()
    await (await page.$('.digit-2')).click()
    await (await page.$('.operator-equals')).click()

    expect(await page.$eval('.display', elem => elem.textContent)).to.equal('42')
  })
})
