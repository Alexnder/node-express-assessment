import md5 from 'md5'
import api from './api'

async function getById(id) {
  try {
    const response = await api.get(`users/${id}`)
    if (!response.data) {
      throw new Error('broken response')
    }

    return response.data
  } catch (e) {
    console.log('getById error:', e)
    throw new Error('cannot access api')
  }
}
async function getAvatarCache(id) {
  const user = await getById(id)
  const avatarUrl = user.data.avatar
  return { avatarUrl, avatarCache: md5(avatarUrl) }
}

export { getById, getAvatarCache }
