import { By, until } from 'selenium-webdriver'

export function findClick(driver, selector) {
  return driver.findElement(By.css(selector)).click()
}

export function waitUntilAppear(driver, selector, by = 'css', time = 10000) {
  return driver.wait(until.elementLocated(By[by](selector)), time)
}

export async function waitAndClick(driver, selector, by = 'css', time = 10000) {
  await waitUntilClickable(driver, selector, by, time)
  return driver.findElement(By[by](selector)).click()
}

export function waitUntilClickable(driver, selector, by = 'css', time = 10000) {
  const element = driver.wait(until.elementLocated(By[by](selector)), time)
  return driver.wait(until.elementIsVisible(element), time)
}

export function setWindowSize(driver, { width, height }) {
  return driver.manage().window().setRect({ width, height })
}

export function setWindowSizeDesktop(driver) {
  return setWindowSize(driver, { width: 1920, height: 1080 })
}

export function setWindowSizeMobile(driver) {
  return setWindowSize(driver, { width: 720, height: 1280 })
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
