import Field from '@/components/ui/field/Field'
import TextArea from '@/components/ui/text-area/TextArea'
import UploadField from '@/components/ui/upload-field/UploadField'
import { FileTypeEnum } from '@/components/ui/upload-field/upload-field.interface'
import { IMediaResponse } from '@/services/media/media.interface'
import { Dispatch, FC, SetStateAction } from 'react'
import { Controller } from 'react-hook-form'
import SuccessMessage from './SuccessMessage'
import FooterForm from './footer-form/FooterForm'
import TogglePublic from './toggle-public/TogglePublic'
import styles from "./uploadVideoForm.module.scss"
import { useUploadVideoForm } from './useUploadVideoForm'
import VideoInformation from './video-information/VideoInformation'

interface IUploadVideoForm {
	videoId:number
	setIsOpen:Dispatch<SetStateAction<boolean>>
}

const UploadVideoForm: FC<IUploadVideoForm> = ({videoId, setIsOpen}) => {

	const {form, status, media} = useUploadVideoForm({videoId, setIsOpen})

	return (
		<form className={"flex lg:flex-wrap flex-col lg:flex-row w-full h-full pb-10"} onSubmit={form.handleSubmit(form.onSubmit)}>
			{status.isSuccess && <SuccessMessage />}
			{status.isChosen ? <>
			<div className='lg:w-7/12 w-full lg:pr-6 pr-0 pt-3 self-start'>
				<Field  {...form.register("name", {
					required:"This field is required"
				})} placeholder='Title' error={form.errors.name}/>
				<TextArea {...form.register("description", {
					required:"This field is required"
				})} placeholder='Description' error={form.errors.description}/>	
				<div className={"mt-10 flex gap-2 items-center"}>
					<Controller
					control={form.control}
					name='thumbnailPath'
					render={({field:{onChange}})=>(
						<UploadField type={FileTypeEnum.THUMBNAIL} onChange={(value:IMediaResponse)=>onChange(value.url)} folder='thumbnails'/>	
					)}
					 />
				</div>
				<Controller
					control={form.control}
					name='isPublic'
					render={({field:{onChange, value}})=>(
						<TogglePublic isEnabled={!!value} clickHandler={()=>onChange(!value)}/>		
					)}
					 />
			</div>
			<div className='lg:w-5/12 pb-6 w-full p-3 lg:pl-10 pl-0'>
						<VideoInformation isUploaded={status.isUploaded} thumbnailPath={media.thumbnailPath} fileName={media.videoFileName} videoId={videoId} />
			</div>
			<FooterForm isUploaded={status.isUploaded} percent={status.percent}/>
			</>:(
			<div className={styles.uploadScreen}>
			<Controller
			control={form.control}
			name='videoPath'
			render={()=>
			 	<UploadField 
				type={FileTypeEnum.VIDEO} 
			 	title={"Firstly upload video 👇"} 
			 	folder='videos' 
			 	onChange={media.handleUploadVideo}  
			 	setValue={status.setProgressPercentage} 
			 	setIsChosen={status.setIsChosen}/>
			 } />
			</div>
			) }
			
		</form>
	)
}

export default UploadVideoForm