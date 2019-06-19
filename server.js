import express from 'express'
import { getById } from './users'

const app = express()
app.get('/', (req, res) => res.send('Hello'))
app.get('/api/user/:userId', async (req, res) => {
  try {
    res.json(await getById(req.params.userId))
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'internal error' })
  }
})

app.listen(3000)
