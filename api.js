const axios = require('axios')

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in/api',
})

module.exports = axiosInstance
