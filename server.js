const express = require('express')
const util = require('./util')

const app = express()
app.get('/', (req, res) => res.send('Hello'))
app.get('/sum', async (req, res) => {
  const result = await util.asyncSum(2, 2)
  res.send(`Result: ${result}`)
})
app.listen(3000)
