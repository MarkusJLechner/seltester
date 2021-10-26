import { defaultDriver } from '#root/js/drivers.js'
import { setWindowSizeDesktop, setWindowSizeMobile, waitUntilAppear } from '#root/js/seleniumUtils.js'
import { gotoBackoffice, logout } from '#root/js/service/hellocash.js'

describe('cash-register-login', function () {
  this.timeout(30000)
  let driver

  beforeEach(async function () {
    driver = await defaultDriver()
  })

  afterEach(async function () {
    await (driver && driver.close())
  })

  it('can login on desktop', async function () {
    await setWindowSizeDesktop(driver)

    await gotoBackoffice(driver)
    await logout(driver)
  })

  it('can login on mobile', async function () {
    await setWindowSizeMobile(driver)

    await gotoBackoffice(driver)
    await logout(driver)
  })

  it('can stays signed in in new tab', async function () {
    await setWindowSizeDesktop(driver)
    await gotoBackoffice(driver)

    const window = await driver.getWindowHandle()
    await driver.switchTo().newWindow('tab')

    await gotoBackoffice(driver, false)
    await waitUntilAppear(driver, '/intern/dashboard', 'id')
    await (driver && driver.close())

    await driver.switchTo().window(window)
  })
})
