import { createSlice } from '@reduxjs/toolkit'
import { login, register, logout } from './auth.actions'
import { IAuthInitialState } from './auth.interface'

export const initialState: IAuthInitialState = {
	user: null,
	accessToken: '',
	isLoading: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(register.pending, state => {
			state.isLoading = true
		}),
			builder.addCase(login.pending, state => {
				state.isLoading = true
			}),
			builder.addCase(logout.pending, state => {
				state.isLoading = true
			}),
			builder.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.accessToken = payload.accessToken
			}),
			builder.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.accessToken = payload.accessToken
			}),
			builder.addCase(logout.fulfilled, (state) => {
				state.isLoading = false
				state.user = null
				state.accessToken = ''
			}),
			builder.addCase(register.rejected, state => {
				state.isLoading = false
				state.user = null
				state.accessToken = ''
			}),
			builder.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = null
				state.accessToken = ''
			}),
			builder.addCase(logout.rejected, state => {
				state.isLoading = false
			})
	},
})
