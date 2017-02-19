const webdriver = require('selenium-webdriver')
const path = require('path')

const chromeDriverPathAddition = `:${path.dirname(require('chromedriver').path)}`

exports.prepareBrowser = async (context) => {
  process.on('beforeExit', () => this.browser && this.browser.quit())
  process.env.PATH += chromeDriverPathAddition

  return await new webdriver.Builder()
    .disableEnvironmentOverrides()
    .forBrowser('chrome')
    .setLoggingPrefs({ browser: 'ALL' })
    .build()
}

exports.cleanupBrowser = (browser) => {
  if (browser) {
    browser.quit()
  }
  process.env.PATH = process.env.PATH.replace(chromeDriverPathAddition, '')
}
