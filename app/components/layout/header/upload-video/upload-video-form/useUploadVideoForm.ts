import { IMediaResponse } from '@/services/media/media.interface'
import { videoApi } from '@/store/api/video.api'
import { IVideoDto } from '@/types/video.interface'
import { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IUseUploadVideoForm {
	videoId: number
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const useUploadVideoForm = ({ videoId, setIsOpen }: IUseUploadVideoForm) => {
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
		setValue,
		watch,
	} = useForm<IVideoDto>({
		mode: 'onChange',
	})

	const [updateVideo, { isSuccess }] = videoApi.useUpdateVideoMutation()

	const onSubmit: SubmitHandler<IVideoDto> = data => {
		updateVideo({
			...data,
			duration: data.duration,
			id: videoId,
		})
			.unwrap()
			.then(() => {
				setIsOpen(false)
				reset()
			})
	}

	const videoPath = watch('videoPath')
	const thumbnailPath = watch('thumbnailPath')
	const duration = watch('duration')
	const [videoFileName, setVideoFileName] = useState('')

	const handleUploadVideo = (media: IMediaResponse) => {
		setValue('videoPath', media.url)
		//@ts-ignore
		setValue('duration', Math.round(media?.duration))
		setVideoFileName(media.name)
	}

	const [isChosen, setIsChosen] = useState(false)

	const [percent, setPercent] = useState(0)
	const [isUploaded, setIsUploaded] = useState(false)
	const setProgressPercentage = (val: number) => {
		setPercent(val)
		if (val === 100) setIsUploaded(true)
	}

	return {
		form: {
			register,
			errors,
			control,
			handleSubmit,
			onSubmit,
		},
		media: {
			videoPath,
			thumbnailPath,
			videoFileName,
			duration,
			handleUploadVideo,
		},
		status: {
			percent,
			isSuccess,
			isChosen,
			setIsChosen,
			isUploaded,
			setProgressPercentage,
		},
	}
}
