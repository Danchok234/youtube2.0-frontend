import axios from 'axios'
import { getContentType } from '../utils/api.utils'

export const API_URL = `${process.env.BASE_URL}/api`
const isServer = typeof window === 'undefined'

export const axiosClassic = axios.create({
	baseURL: isServer
		? API_URL
		: '/api',
	withCredentials: true,
	headers: getContentType(),
})
