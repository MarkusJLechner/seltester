import { addCookie, addCookies } from '../seleniumUtils.js'

export const urlBackoffice = 'https://testing.hellocash.business/intern/dashboard'

export async function gotoBackoffice(driver) {
  await driver.get(urlBackoffice)
  await addCookies(driver, [
    { name: 'rememberMe', value: 'MzU0MzU%3D' },
    { name: 'rememberMeToken', value: '552c294c0d64036853b3b8523a5d747a' },
  ])
  return driver.get(urlBackoffice)
}
