import { IAuthResponse } from '@/services/auth/auth.helper'

export interface IAuthInitialState extends IAuthResponse {
	isLoading:boolean
}
