import { api } from './api'

export const likeApi = api.injectEndpoints({
	endpoints: builder => ({
		like:builder.mutation<boolean, number>({
			query:(id)=>({
			url:`like/${id}`,
			method:"POST"
			}),
			invalidatesTags:(result,error,id)=>[{type:"Video", id}]
		}),
	}),
})