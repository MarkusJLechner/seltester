import { Builder } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js'
import chromedriver from 'chromedriver'
import { envHeadless } from '../utils.js'

export async function driver() {
  const options = new chrome.Options()
  options.addArguments(
    '--disable-extensions',
    '--window-size=1452,1050',
    '--disable-print-preview',
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
