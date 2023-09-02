import { IAuthFields } from '@/components/layout/header/auth/auth.interface'
import { axiosClassic } from '../../api/axios'
import { IAuthResponse } from './auth.helper'

export const AuthService = {
	async register({ email, password }: IAuthFields) {
		const response = await axiosClassic.post<IAuthResponse>('/auth/register', {
			email,
			password,
		})
		return response.data
	},

	async login({ email, password }: IAuthFields) {
		const response = await axiosClassic.post<IAuthResponse>('/auth/login', {
			email,
			password,
		})
		return response.data
	},
}
