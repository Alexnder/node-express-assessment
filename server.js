import express from 'express'
import axios from 'axios'
import { getById, getAvatarCache } from './users'
import {
  writeFile,
  readFile,
  isFileExists,
  removeFile,
} from './file'

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
    const { avatarUrl, avatarCache } = await getAvatarCache(req.params.userId)
    let fileContent
    if (await isFileExists(avatarCache)) {
      fileContent = await readFile(avatarCache)
    } else {
      const response = await axios.get(avatarUrl, { responseType: 'arraybuffer' })
      fileContent = Buffer.from(response.data, 'binary')
      // let's take care about response time and pass waiting of writeFile result
      writeFile(avatarCache, fileContent)
    }
    const imageBase64 = fileContent.toString('base64')
    res.json(imageBase64)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'internal error' })
  }
})
app.delete('/api/user/:userId/avatar', async (req, res) => {
  try {
    const { avatarCache } = await getAvatarCache(req.params.userId)
    if (await isFileExists(avatarCache)) {
      await removeFile(avatarCache)
    }
    res.json({ result: 'success' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'internal error' })
  }
})

app.listen(3000)
