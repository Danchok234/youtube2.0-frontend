import { videoApi } from '@/store/api/video.api'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { BsPencilSquare } from "react-icons/bs"
import { MdDeleteForever } from "react-icons/md"
import { IVideo } from '../../../types/video.interface'
import Avatar from '../avatar/Avatar'
import VideoDuration from './VideoDuration'
import VideoStatistics from './VideoStatistics'
import styles from './videoItem.module.scss'
import { useRouter } from 'next/router'

interface IVideoItem {
	video: IVideo
	isSmall?: boolean,
	isUpdateLink?:boolean,
	removeHandler?:(id:number)=>void,
	isGrey?:boolean
}

const VideoItem: FC<IVideoItem> = ({ video, isSmall = false, isUpdateLink=false, removeHandler, isGrey=false }) => {

	const {push} = useRouter()

	const [deleteVideo] = videoApi.useDeleteVideoMutation()

	return (
		<div
			className={clsx(styles.video_item, {
				[styles.small]: isSmall,
			})}
		>	
			<Link href={`/v/${video.id}`} className={styles.thumbnail}>
					<Image src={video.thumbnailPath?video.thumbnailPath : "/default/video-thumbnail/images.png"} layout={"responsive"} width={100} height={80} alt={'thumbnail'} priority/>

				<VideoDuration duration={video.duration} />
			</Link>
			{video.author && (
					<div className={styles.author_block}>
						<Avatar author={video.author} isSmall />
					</div>
				)}			
			<div className={clsx(styles.info,{
				[styles["grey-bg"]]:isGrey,
				[styles["black-bg"]]:!isGrey
			})}>
				{!isSmall && <div className={styles.author_name}>{video.author?.name}</div>}
				<div className={styles.video_name}>{video.name}</div>
				<div className='flex justify-between items-center'>
				<VideoStatistics views={video.views} createdAt={video.createdAt} />
				<div className='flex gap-2'>
				{
					isUpdateLink && (
						<button onClick={()=> push(`/edit/video/${video.id}`)} className="text-blue-500 text-lg hover:scale-125 transition-all duration-500">
							<BsPencilSquare />
						</button>
					)
				}
				{
					!!removeHandler && (
						<button onClick={()=>deleteVideo(video.id)} className="text-red-500 text-xl hover:scale-125 transition-all duration-500">
							<MdDeleteForever />
						</button>
					)
				}
				</div>
				</div>
			</div>
		</div>
	)
}

export default VideoItem
