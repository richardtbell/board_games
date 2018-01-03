import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://boardgames-8a886.firebaseio.com'
})

export default instance
