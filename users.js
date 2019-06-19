import api from './api'

// eslint-disable-next-line func-names
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

export { getById }
