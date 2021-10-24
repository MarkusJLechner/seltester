import { By } from 'selenium-webdriver'
import { driver as chromedriver } from '@root/js/drivers/chrome.js'
import { findClick, setWindowSize, waitSeconds, waitUntilAppear } from '@root/js/seleniumUtils.js'
import { gotoBackoffice } from '@root/js/service/hellocash.js'
import Mocha from 'mocha'

describe('Default Suite', function () {
  this.timeout(30000)
  let driver

  beforeEach(async function () {
    driver = await chromedriver()
    await gotoBackoffice(driver)
  })

  afterEach(async function () {
    await driver.quit()
  })

  it('Create invoice with custom article', async function () {
    // Test name: ddd
    // Step # | name | target | value
    // 2 | setWindowSize | 1452x1050 |
    await setWindowSize(driver, { width: 1452, height: 1050 })

    // 3 | click | css=.quick-link-top-left > .text-uppercase |
    await driver.findElement(By.css('.quick-link-top-left > .text-uppercase')).click()
    // 4 | click | css=#tab-articles .product:nth-child(1) |
    await waitUntilAppear(driver, '#tab-articles .product:nth-child(1)')
    await driver.findElement(By.css('#tab-articles .product:nth-child(1)')).click()
    // 5 | click | css=#tab-articles .product:nth-child(2) |
    await driver.findElement(By.css('#tab-articles .product:nth-child(2)')).click()
    // 6 | click | css=.modal-body > .form-group:nth-child(2) .form-control |
    await waitSeconds(driver, 1)
    await driver.findElement(By.css('.modal-body > .form-group:nth-child(2) .form-control')).click()
    // 7 | click | css=.modal-body > .form-group:nth-child(2) .form-control |
    await driver.findElement(By.css('.modal-body > .form-group:nth-child(2) .form-control')).click()
    // 8 | click | css=.modal-body > .form-group:nth-child(2) > .col-sm-9 |
    await driver.findElement(By.css('.modal-body > .form-group:nth-child(2) > .col-sm-9')).click()
    // 9 | doubleClick | css=.modal-body > .form-group:nth-child(2) > .col-sm-9 |
    {
      const element = await driver.findElement(By.css('.modal-body > .form-group:nth-child(2) > .col-sm-9'))
      await driver.actions({ bridge: true }).doubleClick(element).perform()
    }
    // 10 | type | css=.modal-body > .form-group:nth-child(2) .form-control | 300
    await driver.findElement(By.css('.modal-body > .form-group:nth-child(2) .form-control')).sendKeys('300')
    // 11 | click | css=.modal-footer:nth-child(1) > .modal-footer > .btn-primary > .block |
    await driver.findElement(By.css('.modal-footer:nth-child(1) > .modal-footer > .btn-primary > .block')).click()
    // 12 | mouseOver | css=.modal-footer:nth-child(1) > .modal-footer > .btn-primary > .block |
    {
      const element = await driver.findElement(
        By.css('.modal-footer:nth-child(1) > .modal-footer > .btn-primary > .block')
      )
      await driver.actions({ bridge: true }).move(element).perform()
    }
    // 13 | mouseOut | css=.modal-footer:nth-child(1) > .modal-footer > .btn-primary > .block |
    {
      const element = await driver.findElement(By.css('body'))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    // 14 | click | css=.btn-primary > img |
    await driver.findElement(By.css('.btn-primary > img')).click()
    // 15 | click | css=.text-ellipsis:nth-child(3) |
    await driver.findElement(By.css('.text-ellipsis:nth-child(3)')).click()
    // 16 | click | css=.payment-buttons:nth-child(1) > .btn:nth-child(1) |
    await findClick(driver, '.payment-buttons:nth-child(1) > .btn:nth-child(2)')

    await waitUntilAppear(
      driver,
      '#modal-invoice-success > div > div > div.modal-body.modal-body-full > div > div > div > div > button'
    )

    await waitSeconds(driver, 1)

    // 17 | click | css=.col-sm-6 > .btn:nth-child(5) |
    await driver
      .findElement(
        By.css('#modal-invoice-success > div > div > div.modal-body.modal-body-full > div > div > div > div > button')
      )
      .click()
  })
})
