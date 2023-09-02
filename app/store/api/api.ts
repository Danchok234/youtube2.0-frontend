import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../api/axios'
import { IUser, IUserDto } from '../../types/user.interface'
import { TypeRootState } from '../store'
export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Profile', 'Video'],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as TypeRootState).auth.accessToken
			if (token) headers.set('Authorization', `Bearer ${token}`)
			return headers
		},
	}),
	endpoints: builder => ({
		getProfile: builder.query<IUser, any>({
			query: () => '/user/profile',
			providesTags: () => [{ type: 'Profile' }],
		}),
		subscribeToChannel: builder.mutation<boolean, number>({
			query: channelId => ({
				url: `/user/subscribe/${channelId}`,
				method: 'PATCH',
			}),
			invalidatesTags: () => [{ type: 'Profile' }],
		}),
		updateUserInfo: builder.mutation<IUser, IUserDto>({
			query: ({ id, ...body }) => ({
				url: `/user/${id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'Profile', id }],
		}),
	}),
})
