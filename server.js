import express from 'express'
import axios from 'axios'
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
app.get('/api/user/:userId/avatar', async (req, res) => {
  try {
    const user = await getById(req.params.userId)
    const avatarUrl = user.data.avatar
    const response = await axios.get(avatarUrl, { responseType: 'arraybuffer' })
    const imageBase64 = Buffer.from(response.data).toString('base64')
    res.json(imageBase64)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'internal error' })
  }
})

app.listen(3000)
