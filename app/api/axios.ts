import axios from 'axios'
import { getContentType } from '../utils/api.utils'

export const API_URL = `https://youtube2-0-backend.onrender.com/api`

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
})
