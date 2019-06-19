/* global describe, it */
import '@babel/polyfill'
import assert from 'assert'
import {
  writeFile,
  readFile,
  isFileExists,
  removeFile,
} from '../file'

describe('file', () => {
  describe('isFileExists()', () => {
    it('test file is not exists', async () => {
      assert.equal(await isFileExists('test'), false)
    })
    it('read test file fails', async () => {
      try {
        await readFile('test')
        assert.fail()
      } catch (e) {
        // pass
      }
    })
    it('write, check, read, delete, check deletion', async () => {
      const buffer = Buffer.from('testcontent')
      await writeFile('test', buffer)
      assert.equal(await isFileExists('test'), true)
      const content = await readFile('test')
      assert.equal(Buffer.compare(content, buffer), 0)
      await removeFile('test', buffer)
      assert.equal(await isFileExists('test'), false)
    })
  })
})
