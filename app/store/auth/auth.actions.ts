import { IAuthFields } from '@/components/layout/header/auth/auth.interface'
import { IAuthResponse } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'
import { toastrError } from '../../utils/api.utils'

export const register = createAsyncThunk<IAuthResponse, IAuthFields>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.register({ email, password })
			toastr.success('Registration', 'Success')
			toastr.info("Email Verification", "Check You Email Address!", {
				timeOut:10000
			})
			return response
		} catch (error) {
			toastrError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, IAuthFields>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.login({ email, password })
			toastr.success('Login', 'Success')
			return response
		} catch (error) {
			toastrError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	return {}
})
