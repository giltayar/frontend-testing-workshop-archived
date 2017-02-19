const {describe, it, before, after} = require('mocha')
const {expect} = require('chai')
const path = require('path')
const express = require('express')
const {prepareBrowser, cleanupBrowser} = require('../utils/browser-automation')

describe('calculator app', function () {
  let browser
  let server

  this.timeout(30000)

  before((done) => {
    const app = express()
    app.use('/', express.static(path.resolve(__dirname, '../../dist')))
    server = app.listen(8080, done)
  })
  after(() => {
    server.close()
  })

  before(async () => {
    browser = await prepareBrowser(this)
  })
  after(() => cleanupBrowser(browser))

  it('should work', async function () {
    await browser.get('http://localhost:8080')

    expect(await browser.getTitle()).to.equal('Calculator')
  })
})
