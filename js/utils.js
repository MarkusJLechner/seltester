import { writeFile, mkdir } from 'fs/promises'
import { resolve, dirname, sep } from 'path'
import { fileURLToPath } from 'url'

export const envCI = process.env.CI || false
export const envBrowser = process.env.browser || 'chrome'
const processHeadless = !!process.env.NODE_HEADLESS
export const envHeadless = processHeadless || envCI

function rootPath() {
  console.log(import.meta.url)
  console.log(fileURLToPath(import.meta.url))
  if (!global.ROOT_PATH) {
    global.__filename = fileURLToPath(import.meta.url)
    global.ROOT_PATH = resolve(dirname(__filename), '..')
  }

  return global.ROOT_PATH
}

export function absolutePath(path) {
  const root = rootPath()
  return `${root}${path.replace('/', sep)}`
}

function mkdirNotExist(filename) {
  return mkdir(dirname(absolutePath(filename)), { recursive: true })
}

export async function writeBase64(filename, data) {
  await mkdirNotExist(filename)
  return writeFile(absolutePath(filename), data, {
    encoding: 'base64',
  })
}

export async function takeScreenshot(driver, filename) {
  const screenshot = await driver.takeScreenshot()
  return writeBase64(`/screenshots/${Date.now()}_${filename}.jpeg`, screenshot)
}
