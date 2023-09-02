import ChannelInfo from '@/components/ui/channel-info/ChannelInfo'
import SubscribeButton from '@/components/ui/subscribe-button/SubscribeButton'
import { IVideo } from '@/types/video.interface'
import { formatCompactNumber } from '@/utils/format-number'
import dayjs from 'dayjs'
import { FC, useEffect } from 'react'
import { AiFillCalendar, AiFillEye } from "react-icons/ai"
import { FaHeart } from 'react-icons/fa'
import styles from "./videoDetails.module.scss"
import { videoApi } from '@/store/api/video.api'

interface IVideoDetails {
	video:IVideo
}

const VideoDetails: FC<IVideoDetails> = ({video}) => {
	
	const [like, {isLoading}] = videoApi.useUpdateLikesMutation()

	return <div className={styles.videoDetails}>
		<div className={styles.left_section}>
			{
				video.author && <ChannelInfo channel={video.author} withDescription={false}/>
			}
			
			<h3 className={styles.videoName}>{video.name}</h3>
			<p className={styles.description}>{video.description}</p>
		</div> 
		<div className={styles.right_section}>
			<div className={styles.actions}>
				{
					video.author && <SubscribeButton toChannelId={video.author.id} />
				}
				<button className={styles.like_button} onClick={()=>like(video.id)} disabled={isLoading}>
					<FaHeart /> <span>Like</span>
				</button>
			</div>	
			<div className={styles.statistics}>
				<div className={styles.statistics_item}>
					<AiFillEye />
					<span>{formatCompactNumber(video.views)} views</span>
				</div>
				<div className={styles.statistics_item}>
					<FaHeart />
					<span>{formatCompactNumber(video.likes)} likes</span>
				</div>
				<div className={styles.statistics_item}>
					<AiFillCalendar />
					<span>{dayjs(new Date(video.createdAt)).fromNow()}</span>
				</div>
			</div>
		</div>
	</div>
}

export default VideoDetails