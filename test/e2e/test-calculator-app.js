const {describe, it, before, after} = require('mocha')
const {expect} = require('chai')
const {prepareBrowser, cleanupBrowser} = require('../utils/browser-automation')

describe('calculator app', function () {
  let browser

  this.timeout(30000)

  before(async () => {
    browser = await prepareBrowser(this)
  })

  after(() => cleanupBrowser(browser))


  it('should work', async function () {
    console.log(browser)
    await browser.get('http://www.google.com')

    expect(await browser.getTitle()).to.equal('Calculator')
  })
})
