import Layout from '@/components/layout/Layout'
import TogglePublic from '@/components/layout/header/upload-video/upload-video-form/toggle-public/TogglePublic'
import VideoInformation from '@/components/layout/header/upload-video/upload-video-form/video-information/VideoInformation'
import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/field/Field'
import TextArea from '@/components/ui/text-area/TextArea'
import UploadField from '@/components/ui/upload-field/UploadField'
import { FileTypeEnum } from '@/components/ui/upload-field/upload-field.interface'
import { useAuth } from '@/hooks/useAuth'
import { IMediaResponse } from '@/services/media/media.interface'
import { videoApi } from '@/store/api/video.api'
import { IVideoDto } from '@/types/video.interface'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

const VideoEdit: FC = () => {
	const { push, query } = useRouter()

	const videoId = Number(query.id)

	const { data: video } = videoApi.useGetVideoByIdQuery(videoId, {
		skip: !videoId,
	})

	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		control,
		setValue,
	} = useForm<IVideoDto>({
		mode: 'onChange',
	})

	const [updateVideo, { isLoading: isUpdateVideoLoading }] =
		videoApi.useUpdateVideoMutation()

	const { user } = useAuth()

	if (!user?.id) push('/')

	const onSubmit: SubmitHandler<IVideoDto> = data => {
		updateVideo({
			...data,
			id: videoId,
		})
			.unwrap()
			.then(() => {
				toastr.success('Status', 'Success Updating!')
				push('/studio')
			})
	}

	useEffect(() => {
		if (video) {
			setValue('name', video.name)
			setValue('thumbnailPath', video.thumbnailPath)
			setValue('description', video.description)
			setValue('isPublic', video.isPublic)
			setValue('videoPath', video.videoPath)
			setValue('duration', video.duration)
		}
	}, [video])

	return (
		<Layout title='Video editing'>
			<form
				className={
					'mt-10 md:ml-5 ml-0 flex md:flex-row flex-col flex-wrap w-full h-full'
				}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='md:w-7/12 w-full md:pr-6 pr-0 pt-3 self-start'>
					<Field
						{...register('name', {
							required: 'This field is required',
						})}
						placeholder='Title'
						error={errors.name}
					/>
					<TextArea
						{...register('description', {
							required: 'This field is required',
						})}
						placeholder='Description'
						error={errors.description}
					/>
					<div
						className={'mt-10 flex flex-col items-start gap-7 justify-center'}
					>
						<div>
							<h3 className='mb-3'>Thumbnail:</h3>
							<Controller
								control={control}
								name='thumbnailPath'
								render={({ field: { onChange } }) => (
									<UploadField
										type={FileTypeEnum.THUMBNAIL}
										onChange={(value: IMediaResponse) => onChange(value.url)}
										folder='thumbnails'
									/>
								)}
							/>
						</div>
						<div>
							<h3 className='mb-3'>Video:</h3>
							<Controller
								control={control}
								name='videoPath'
								render={({ field: { onChange } }) => (
									<UploadField
										type={FileTypeEnum.VIDEO}
										onChange={(value: IMediaResponse) => onChange(value.url)}
										folder='videos'
									/>
								)}
							/>
						</div>
					</div>
					<Controller
						control={control}
						name='isPublic'
						render={({ field: { onChange, value } }) => (
							<TogglePublic
								isEnabled={!!value}
								clickHandler={() => onChange(!value)}
							/>
						)}
					/>
				</div>
				<div className='md:w-5/12 w-full p-3 md:pl-10 pl-0'>
					<VideoInformation
						isUploaded
						thumbnailPath={watch('thumbnailPath')}
						fileName={''}
						videoId={videoId}
					/>
				</div>
				<Button className='mt-10'>
					{' '}
					{isUpdateVideoLoading ? 'Wait...' : 'Save'}{' '}
				</Button>
			</form>
		</Layout>
	)
}

export default VideoEdit
