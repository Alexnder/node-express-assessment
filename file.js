import fs from 'fs'
import path from 'path'

async function writeFile(filename, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join('var', filename), content, err => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}
async function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join('var', filename), (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data)
    })
  })
}
async function isFileExists(filename) {
  return new Promise(resolve => {
    fs.access(path.join('var', filename), fs.F_OK, (err) => {
      if (err) {
        resolve(false)
        return
      }
      resolve(true)
    })
  })
}
async function removeFile(filename) {
  return new Promise((resolve, reject) => {
    fs.unlink(path.join('var', filename), (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

export {
  writeFile,
  readFile,
  isFileExists,
  removeFile,
}
