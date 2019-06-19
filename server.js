import express from 'express'
import axios from 'axios'
import md5 from 'md5'
import { getById } from './users'
import { writeFile, readFile, isFileExists } from './file'

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
    const id = req.params.userId
    const user = await getById(id)
    const avatarUrl = user.data.avatar
    const cacheFileName = md5(avatarUrl)
    let fileContent
    if (await isFileExists(cacheFileName)) {
      fileContent = await readFile(cacheFileName)
    } else {
      const response = await axios.get(avatarUrl, { responseType: 'arraybuffer' })
      fileContent = Buffer.from(response.data, 'binary')
      writeFile(cacheFileName, fileContent)
    }
    const imageBase64 = fileContent.toString('base64')
    res.json(imageBase64)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'internal error' })
  }
})

app.listen(3000)
