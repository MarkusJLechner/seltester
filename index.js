import chrome from 'selenium-webdriver/chrome.js'
import { Builder, By, until } from 'selenium-webdriver'
import { describe, it, beforeEach, afterEach } from 'mocha'
import chromedriver from 'chromedriver'

const headless = false

describe('Default Suite', function () {
  this.timeout(30000)
  let driver
  let vars

  beforeEach(async function () {
    const options = new chrome.Options()
    options.addArguments(
      '--disable-extensions',
      '--window-size=1452,1050',
      '--disable-print-preview',
      //'--no-sandbox',
      //'--disable-gpu',
      //'--enable-logging --v=1',
      '--disable-popup-blocking'
    )
    if (headless) {
      options.addArguments('--headless')
    }

    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()

    await driver.get('https://testing.hellocash.business/intern/dashboard')

    await driver.manage().addCookie({ name: 'rememberMe', value: 'MzU0MzU%3D' })
    await driver.manage().addCookie({ name: 'rememberMeToken', value: '552c294c0d64036853b3b8523a5d747a' })

    await driver.get('https://testing.hellocash.business/intern/dashboard')

    vars = {}
  })

  afterEach(async function () {
    await driver.quit()
  })

  it('Create invoice', async function () {
    // Test name: ddd
    // Step # | name | target | value
    // 2 | setWindowSize | 1452x1050 |
    await driver.manage().window().setRect({ width: 1452, height: 1050 })
    // 3 | click | css=.quick-link-top-left > .text-uppercase |
    await driver.findElement(By.css('.quick-link-top-left > .text-uppercase')).click()
    // 4 | click | css=#tab-articles .product:nth-child(1) |
    await driver.wait(until.elementLocated(By.css('#tab-articles .product:nth-child(1)')), 10000)

    await driver.findElement(By.css('#tab-articles .product:nth-child(1)')).click()
    // 5 | click | css=.btn-invoice |
    await driver.findElement(By.css('.btn-invoice')).click()
    // 6 | mouseOver | css=.btn-invoice |
    {
      const element = await driver.findElement(By.css('.btn-invoice'))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    // 7 | mouseOut | css=.btn-invoice |
    {
      const element = await driver.findElement(By.css('body'))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    // 8 | click | id=input-25 |
    await driver.findElement(By.id('input-25')).click()
    // 9 | mouseOver | css=.v-btn__content > .fa |

    await driver.wait(until.elementLocated(By.css('.v-btn__content > .fa')), 10000)

    {
      const element = await driver.findElement(By.css('.v-btn__content > .fa'))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    // 10 | mouseOut | css=.v-btn__content > .fa |
    {
      const element = await driver.findElement(By.css('body'))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    // 11 | mouseOver | css=tr:nth-child(1) .button-select-single > .v-btn__content |
    await driver.wait(until.elementLocated(By.css('tr:nth-child(1) .button-select-single > .v-btn__content')), 10000)
    {
      const element = await driver.findElement(By.css('tr:nth-child(1) .button-select-single > .v-btn__content'))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    // 12 | mouseOut | css=tr:nth-child(1) .button-select-single > .v-btn__content |
    {
      const element = await driver.findElement(By.css('body'))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    // 13 | mouseOver | css=tr:nth-child(1) .button-select-single > .v-btn__content |
    {
      const element = await driver.findElement(By.css('tr:nth-child(2) .button-select-single > .v-btn__content'))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    // 14 | click | css=tr:nth-child(1) .button-select-single > .v-btn__content |
    await driver.findElement(By.css('tr:nth-child(2) .button-select-single > .v-btn__content')).click()
    // 15 | mouseOut | css=.v-btn--loading > .v-btn__content |
    {
      const element = await driver.findElement(By.css('body'))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    // 16 | click | css=.payment-buttons:nth-child(1) > .btn:nth-child(1) |
    await driver.findElement(By.css('.payment-buttons:nth-child(1) > .btn:nth-child(2)')).click()

    await driver.sleep(1 * 1000)

    await driver.wait(
      until.elementLocated(
        By.css('#modal-invoice-success > div > div > div.modal-body.modal-body-full > div > div > div > div > button')
      ),
      10000
    )

    // 17 | click | css=.col-sm-6 > .btn:nth-child(5) |
    await driver
      .findElement(
        By.css('#modal-invoice-success > div > div > div.modal-body.modal-body-full > div > div > div > div > button')
      )
      .click()
  })
})
