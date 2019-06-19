const assert = require('assert')
const util = require('../util')

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
  })
})
describe('util', () => {
  describe('sum()', () => {
    it('2 + 2 = 4', () => {
      assert.equal(util.sum(2, 2), 4)
    })
  })
  describe('async sum()', () => {
    it('2 + 2 = 4', async () => {
      assert.equal(await util.asyncSum(2, 2), 4)
    })
  })
})
