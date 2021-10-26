import { waitAndClick, waitUntilAppear } from '#root/js/seleniumUtils.js'
import { By, Key } from 'selenium-webdriver'

export const urlBackoffice = 'https://testing.hellocash.business/intern/dashboard'

export async function gotoBackoffice(driver, withLogin = true) {
  await driver.get(urlBackoffice)
  if (withLogin) {
    await login(driver)
  }
}

export async function login(driver) {
  await driver.findElement(By.id('email')).sendKeys('at@hc.com')
  await driver.findElement(By.id('password')).sendKeys('123456')
  await driver.findElement(By.id('password')).sendKeys(Key.ENTER)
  return waitUntilAppear(driver, '/intern/dashboard', 'id')
}

export async function logout(driver) {
  await waitAndClick(driver, '#page-wrapper > div:nth-child(1) > nav > ul > li:nth-child(4) > a')
  await waitAndClick(
    driver,
    'body > div.loginColumns.animated.fadeInDown > div.row.logout-box > div > div:nth-child(2) > div > a'
  )
  return driver.findElement(By.id('email')).click()
}
