export const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w200/'
export const BASE_URL = 'https://api.themoviedb.org/3/movie/'
export const API_KEY = '74575fcf4f67eeee3dde6068b415b8b5'

import axios from 'axios'

const webApi = axios.create({
  baseURL: BASE_URL,
})

export default webApi
