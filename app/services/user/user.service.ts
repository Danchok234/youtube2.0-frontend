import { IUser } from '@/types/user.interface'
import { axiosClassic } from '../../api/axios'

export const UserService = {
	async getAll() {
		return axiosClassic.get<IUser[]>(`/user`)
	},
	async getUser(id: number) {
		return axiosClassic.get<IUser[]>(`/user/by-id/${id}`)
	},
}
