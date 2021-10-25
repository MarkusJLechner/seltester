import { Builder } from 'selenium-webdriver'
import seleniumChrome from 'selenium-webdriver/chrome.js'
import chromedriver from 'chromedriver'
import { envHeadless } from '#root/js/utils.js'

export function defaultDriver() {
  return chrome()
}

export async function chrome() {
  const options = new seleniumChrome.Options()
  options.addArguments(
    '--disable-extensions',
    '--window-size=1452,1050',
    '--disable-print-preview',
    '--ignore-certificate-error',
    //'--no-sandbox',
    //'--disable-gpu',
    //'--enable-logging --v=1',
    '--disable-popup-blocking'
  )
  options.excludeSwitches('enable-logging') // disable chrome logging
  options.setUserPreferences({ 'download.default_directory': '/dev/null', download_restrictions: 3 }) // set download path

  if (envHeadless) {
    options.addArguments('--headless')
  }

  return new Builder().forBrowser('chrome').setChromeOptions(options).build()
}
