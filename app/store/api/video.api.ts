import { IVideo, IVideoDto } from '@/types/video.interface'
import { api } from './api'
import { type } from 'os'

export const videoApi = api.injectEndpoints({
	endpoints:builder => ({
		createVideo:builder.mutation<string,void>({
			query: () => ({
				url: 'video',
				method: 'POST',
			}),
			invalidatesTags: (result, error) => [{type:"Profile"}, {type:"Video"}],
		}),
		deleteVideo:builder.mutation<boolean, number>({
			query:(id)=>({
				url:`video/${id}`,
				method:"DELETE"
			}),
			invalidatesTags:()=>[{type:"Profile"}]
		}),
		updateVideo:builder.mutation<IVideo, IVideoDto>({
			query: ({id, ...body}) => ({
				url:`video/${id}`,
				method:"PUT",
				body
			}),
			invalidatesTags:(result, error,{id})=>[{type:"Video", id:id}, {type:"Profile"}]
		}),

		getVideosBySearchTerm:builder.query<IVideo[], string>({
			query:(searchTerm)=>({url:"/video", params:{searchTerm}})
		}),
		getVideoById:builder.query<IVideo, number>({
			query:id=>`/video/by-id/${id}`,
			providesTags:(result,error,id)=>[{type:"Video", id}]
		}),
		getPrivateVideo:builder.query<IVideo, number>({
			query:id=>`/video/get-private/${id}`,
			providesTags:(result,error,id)=>[{type:"Video", id}]
		}),
		updateLikes:builder.mutation<IVideo, number>({
			query:(id)=>({
			url:`/video/update-likes/${id}`,
			method:"PATCH"
		}),
			invalidatesTags:(result,error,id)=>[{type:"Video", id}]
		}),
		updateViews:builder.mutation<IVideo, number>({
			query:(id)=>({
			url:`/video/update-views/${id}`,
			method:"PATCH"
		}),
			invalidatesTags:(result,error,id)=>[{type:"Video", id}]
		}),
	})
})