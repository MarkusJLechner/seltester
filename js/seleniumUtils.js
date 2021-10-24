import { By, until } from 'selenium-webdriver'

export function findClick(driver, selector) {
  return driver.findElement(By.css(selector)).click()
}

export function waitUntilAppear(driver, selector, time = 10000) {
  return driver.wait(until.elementLocated(By.css(selector)), time)
}

export function setWindowSize(driver, { width, height }) {
  return driver.manage().window().setRect({ width, height })
}

export function waitSeconds(driver, time) {
  return driver.sleep(time * 1000)
}

export function addCookie(driver, { name, value }) {
  return driver.manage().addCookie({ name, value })
}

export function addCookies(driver, cookies = []) {
  const promises = []
  for (let cookie of cookies) {
    promises.push(addCookie(driver, cookie))
  }

  return Promise.all(promises)
}
