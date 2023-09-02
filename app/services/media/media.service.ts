import { axiosClassic } from '@/app/api/axios'
import { IMediaResponse } from './media.interface'

const onUploadProgress = (progressEvent: any) => {
	const { total, loaded } = progressEvent
	return { progress: Math.ceil((loaded / total) * 100) }
}

export const MediaService = {
	async upload(media: FormData,accessToken:string, folder?: string, setValue?: (val: number) => void) {
		return axiosClassic.post<IMediaResponse>('/media', media, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data', "Authorization":`Bearer ${accessToken}` },
			onUploadProgress: progressEvent => {
				if (setValue) {
					const {progress} = onUploadProgress(progressEvent)
					setValue(progress)
				}
			},
		})
	},
}
