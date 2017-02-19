const webdriver = require('selenium-webdriver')
const path = require('path')

const chromeDriverPathAddition = `:${path.dirname(require('chromedriver').path)}`

exports.prepareBrowser = async (context) => {
  process.on('beforeExit', () => this.browser && this.browser.quit())
  process.env.PATH += chromeDriverPathAddition

  return await new webdriver.Builder()
    .disableEnvironmentOverrides()
    .forBrowser('chrome')
    .setLoggingPrefs({browser: 'ALL', driver: 'ALL'})
    .build()
}

exports.cleanupBrowser = async (browser) => {
  (await browser.manage().logs().get('driver')).forEach(l => process.stdout.write(`${l.message}\n`));
  (await browser.manage().logs().get('browser')).forEach(l => process.stdout.write(`${l.message}\n`))

  if (browser) {
    browser.quit()
  }
  process.env.PATH = process.env.PATH.replace(chromeDriverPathAddition, '')
}
