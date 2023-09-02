import { MediaService } from '@/services/media/media.service'
import { catchError } from '@/utils/api.utils'
import { useMutation } from "@tanstack/react-query"
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export const useUploadFile = (
	onChange:(...event:any)=>void,
	accessToken:string,
	setIsChosen?:Dispatch<SetStateAction<boolean>>,
	folder?:string,
	setValue?:(val:number)=>void,
) => {

	const {mutateAsync} = useMutation(["uploadFile"], (data:FormData)=>MediaService.upload(data,accessToken, folder, setValue),{
		onSuccess:({data})=>{
			onChange(data)
		},
		onError:(error:any)=>{
			alert(
				catchError(error)
			)
		}
	})

	const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if( !files?.length ) return

		setIsChosen && setIsChosen(true)

		const formData = new FormData()
		formData.append("media", files[0])

		await mutateAsync(formData)
	}

	return {
		uploadFile,
	}

}