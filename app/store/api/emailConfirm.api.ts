import { IConfirmEmailDto } from '@/types/confirm-email.interface'
import { api } from './api'

export const emailConfirmationApi = api.injectEndpoints({
	endpoints: builder => ({
		resendVerificationLink: builder.mutation({
			query: () => ({
				method: 'POST',
				url: 'user/resend-confirmation-link',
			}),
		}),
		verifyEmail: builder.mutation<null, IConfirmEmailDto>({
			query: (body) => ({
				method: 'POST',
				url: 'user/verify',
				body
			}),
			invalidatesTags:()=>[{type:"Profile"}]
		}),
	}),
})
