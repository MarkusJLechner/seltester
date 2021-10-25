import { defaultDriver } from '#root/js/drivers.js'
import { By } from 'selenium-webdriver'
import { findClick, setWindowSize, waitSeconds, waitUntilAppear, waitUntilClickable } from '#root/js/seleniumUtils.js'
import { gotoBackoffice } from '#root/js/service/hellocash.js'
import Mocha from 'mocha'

describe('cash-register/invoice', function () {
  this.timeout(30000)
  let driver

  beforeEach(async function () {
    driver = await defaultDriver()
    await gotoBackoffice(driver)
  })

  afterEach(async function () {
    await (driver && driver.close())
  })

  it('creates an invoice', async function () {
    // Test name: ddd
    // Step # | name | target | value
    // 2 | setWindowSize | 1452x1050 |
    await setWindowSize(driver, { width: 1452, height: 1050 })
    // 3 | click | css=.quick-link-top-left > .text-uppercase |
    await driver.findElement(By.css('.quick-link-top-left > .text-uppercase')).click()

    // 4 | click | css=#tab-articles .product:nth-child(1) |
    await waitUntilAppear(driver, '#tab-articles .product:nth-child(1)')
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

    await waitUntilAppear(driver, '.v-btn__content > .fa')
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
    await waitUntilAppear(driver, 'tr:nth-child(1) .button-select-single > .v-btn__content')
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

    await findClick(driver, '.payment-buttons:nth-child(1) > .btn:nth-child(2)')

    await waitSeconds(driver, 1)

    await waitUntilAppear(
      driver,
      '#modal-invoice-success > div > div > div.modal-body.modal-body-full > div > div > div > div > button'
    )

    // 17 | click | css=.col-sm-6 > .btn:nth-child(5) |
    await driver
      .findElement(
        By.css('#modal-invoice-success > div > div > div.modal-body.modal-body-full > div > div > div > div > button')
      )
      .click()
  })

  it('parks and loads and create invoice', async function () {
    await setWindowSize(driver, { width: 1452, height: 1050 })

    await driver.findElement(By.css('.quick-link-top-left > .text-uppercase')).click()

    await waitUntilAppear(driver, '#tab-articles .product:nth-child(1)')

    await driver.findElement(By.css('#tab-articles .product:nth-child(1)')).click()
    await driver.findElement(By.css('.btn-park-invoice > img')).click()
    {
      const element = await driver.findElement(By.css('.btn-park-invoice > img'))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    {
      const element = await driver.findElement(By.css('Body'))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    await driver.findElement(By.name('remark')).sendKeys('test')
    await driver.findElement(By.css('#form-park-invoice .btn-primary > .block')).click()
    await driver.findElement(By.css('.btn-load-parked-invoice > img')).click()
    await waitUntilAppear(
      driver,
      '#modal-parked-invoices > div > div > div.modal-body > div > table > tbody > tr:nth-child(1) > td.text-right > div > a.btn.btn-white.btn-sm.btn-get-parked-invoice'
    )

    await waitUntilClickable(
      driver,
      '#modal-parked-invoices > div > div > div.modal-body > div > table > tbody > tr:nth-child(1) > td.text-right > div > a.btn.btn-white.btn-sm.btn-get-parked-invoice'
    )

    await driver.findElement(By.linkText('Laden')).click()
    {
      const element = await driver.findElement(By.css('#tab-articles .hidden-sm'))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    {
      const element = await driver.findElement(By.css('Body'))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    await driver.findElement(By.css('.btn-invoice')).click()
    {
      const element = await driver.findElement(By.css('.btn-invoice'))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    {
      const element = await driver.findElement(By.css('Body'))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    await driver.findElement(By.css('.text-ellipsis:nth-child(3)')).click()
    await driver.findElement(By.css('.payment-buttons:nth-child(1) > .btn:nth-child(2)')).click()

    await waitUntilClickable(driver, '#modal-invoice-success .btn:nth-child(5)')

    await driver.findElement(By.css('#modal-invoice-success .btn:nth-child(5)')).click()
  })
})
