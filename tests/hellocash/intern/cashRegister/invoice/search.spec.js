import { defaultDriver } from '#root/js/drivers.js'
import { setWindowSizeDesktop, waitAndClick } from '#root/js/seleniumUtils.js'
import { gotoBackoffice } from '#root/js/service/hellocash.js'
import { strictEqual } from 'assert'
import { By } from 'selenium-webdriver'

describe('cash-register/invoice/search', function () {
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

  async function itCreatesInvoice() {
    await driver.get('https://testing.hellocash.business/intern/cash-register/invoice/new')
    await driver.manage().window().setRect({ width: 1452, height: 1050 })
    await driver
      .findElement(By.css('#tab-articles .container-products-category:nth-child(1) > .product:nth-child(1)'))
      .click()
    await driver.findElement(By.css('.btn-primary > img')).click()
    {
      const element = await driver.findElement(By.css('.btn-primary > img'))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    {
      const element = await driver.findElement(By.css('body'))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }

    await driver.findElement(By.css('.col-xs-4 > .invoice-due')).click()

    const amountCreate = await driver.executeScript(`return document.querySelector(
      '#modal-invoice > div > div > div.modal-body.modal-body-full > div > div > div.col-xs-12.col-md-8.col-md-push-4 > div > div > div.m-b-md > div.row.invoice-cash-row > div.hidden-xs.hidden-sm > div:nth-child(1) > h2'
    ).innerText`)

    await driver.findElement(By.css('.payment-buttons:nth-child(1) > .btn:nth-child(2)')).click()
    {
      const element = await driver.findElement(By.css('.payment-buttons:nth-child(1) > .btn:nth-child(3)'))
      await driver.actions({ bridge: true }).move(element).perform()
    }

    return amountCreate
  }

  it('finds the created invoice in the table', async function () {
    const amountCreate = await itCreatesInvoice()

    await waitAndClick(
      driver,
      '#modal-invoice-success > div > div > div.modal-body.modal-body-full > div > div > div > div > a'
    )

    await waitAndClick(driver, '.clickable:nth-child(1) > td:nth-child(2)')

    const amountTable = await driver.executeScript(`return document.querySelector(
      '#page-wrapper > div.wrapper.wrapper-content.animated > div > div > div > div > div.invoice-box.h-150 > div.table-responsive > table > tbody > tr.clickable.active > td:nth-child(4)'
    ).innerText`)

    await driver.findElement(By.css('.active > td:nth-child(4)')).click()

    strictEqual(amountCreate, amountTable)
  })
})
