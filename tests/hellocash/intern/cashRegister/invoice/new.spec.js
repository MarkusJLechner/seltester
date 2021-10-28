import { defaultDriver } from '#root/js/drivers.js'
import { By } from 'selenium-webdriver'
import {
  findClick,
  setWindowSizeDesktop,
  waitAndClick,
  waitSeconds,
  waitUntilAppear,
  waitUntilClickable,
} from '#root/js/seleniumUtils.js'
import { gotoBackoffice } from '#root/js/service/hellocash.js'

describe('cash-register/invoice', function () {
  this.timeout(30000)
  let driver

  beforeEach(async function () {
    driver = await defaultDriver()
    await setWindowSizeDesktop(driver)
    await gotoBackoffice(driver)
  })

  afterEach(async function () {
    await (driver && driver.close())
  })

  it('creates an invoice', async function () {
    await driver.findElement(By.css('.quick-link-top-left > .text-uppercase')).click()

    await waitUntilAppear(driver, '#tab-articles .product:nth-child(1)')
    await driver.findElement(By.css('#tab-articles .product:nth-child(1)')).click()
    await driver.findElement(By.css('.btn-invoice')).click()
    {
      const element = await driver.findElement(By.css('.btn-invoice'))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    {
      const element = await driver.findElement(By.css('body'))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    await driver.findElement(By.id('input-25')).click()

    await waitUntilAppear(driver, '.v-btn__content > .fa')
    {
      const element = await driver.findElement(By.css('.v-btn__content > .fa'))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    {
      const element = await driver.findElement(By.css('body'))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    await waitUntilAppear(driver, 'tr:nth-child(1) .button-select-single > .v-btn__content')
    {
      const element = await driver.findElement(By.css('tr:nth-child(1) .button-select-single > .v-btn__content'))
      await driver.actions({ bridge: true }).move(element).perform()
    }

    {
      const element = await driver.findElement(By.css('body'))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    {
      const element = await driver.findElement(By.css('tr:nth-child(2) .button-select-single > .v-btn__content'))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    await driver.findElement(By.css('tr:nth-child(2) .button-select-single > .v-btn__content')).click()
    {
      const element = await driver.findElement(By.css('body'))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    await driver.findElement(By.css('.payment-buttons:nth-child(1) > .btn:nth-child(2)')).click()

    await findClick(driver, '.payment-buttons:nth-child(1) > .btn:nth-child(2)')

    await waitAndClick(
      driver,
      '#modal-invoice-success > div > div > div.modal-body.modal-body-full > div > div > div > div > button'
    )
  })

  it('parks and loads and create invoice', async function () {
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
    await waitAndClick(driver, '#form-park-invoice > div.modal-footer > button.btn.btn-primary')
    await waitAndClick(
      driver,
      '#page-wrapper > div.fh-billing > div > div.col-sm-6.col-md-7.col-lg-6.full-height.billing-left-panel > div.footer > div.h-scroll-container > div > button.btn.btn-link.btn-load-parked-invoice'
    )
    await waitAndClick(
      driver,
      '#modal-parked-invoices > div > div > div.modal-body > div > table > tbody > tr:nth-child(1) > td.text-right > div > a.btn.btn-white.btn-sm.btn-get-parked-invoice:nth-child(1)'
    )
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
