import Image from "next/image"
import { FC } from 'react'
import styles from "./videoInformation.module.scss"
import Link from "next/link"

interface IVideoInformation {
	isUploaded:boolean
	videoId:number,
	fileName:string,
	thumbnailPath:string
}

const VideoInformation: FC<IVideoInformation> = ({isUploaded,videoId, fileName, thumbnailPath}) => {

	return (
		<>
		{!thumbnailPath ? (
			<div className={styles.thumbnail}>
				{
					!isUploaded ? (
						"Video is uploading..."
					) : (
						"Upload thumbnail!"
					)
				}
			</div>
		):(
			<Image src={thumbnailPath} width={320} height={190} alt='thumbnail' layout='responsive' loading='lazy'/>
		)}
		<div className={"flex flex-col text-start gap-7 mt-3"}>
			<div>
				<span className='text-sm text-grey-400'>Video link: </span>
				<span className='text-lg'>
					<Link className='text-orange' href={`/v/${videoId}`}>
						http://localhost:3000/v/{videoId}
					</Link>
				</span>
			</div>
			<div className='flex flex-col'>
				<span className="text-sm text-grey-400">Filename:</span>
				<span className='text-lg'>{fileName}</span>
			</div>
		</div>
		</>
	)
}

export default VideoInformation