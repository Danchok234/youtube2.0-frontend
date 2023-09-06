import Button from '@/components/ui/button/Button'
import ChannelInfo from '@/components/ui/channel-info/ChannelInfo'
import SubscribeButton from '@/components/ui/subscribe-button/SubscribeButton'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/store/api/api'
import { likeApi } from '@/store/api/like.api'
import { IVideo } from '@/types/video.interface'
import { formatCompactNumber } from '@/utils/format-number'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { FC } from 'react'
import { AiFillCalendar, AiFillEye } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import styles from './videoDetails.module.scss'

interface IVideoDetails {
	video: IVideo
}

const VideoDetails: FC<IVideoDetails> = ({ video }) => {
	const { user } = useAuth()

	const { data: profile } = api.useGetProfileQuery(null, {
		skip: !user,
	})

	const [like, { data, isLoading }] = likeApi.useLikeMutation()

	const isLiked =
		video?.likes?.some(
			like => like.toVideo.id === video.id && like.fromChannel.id === profile?.id
		) || !!data

	return (
		<div className={styles.videoDetails}>
			<div className={styles.left_section}>
				{video.author && <ChannelInfo channel={video.author} withDescription={false} />}

				<h3 className={styles.videoName}>{video.name}</h3>
				<p className={styles.description}>{video.description}</p>
			</div>
			<div className={styles.right_section}>
				<div className={styles.actions}>
					{video.author && <SubscribeButton toChannelId={video.author.id} />}
					{user && (
						<Button
							className={clsx(styles.like_button, {
								[styles.liked]: isLiked,
							})}
							onClick={() => like(video.id)}
							disabled={isLoading}
						>
							<FaHeart /> <span>Like</span>
						</Button>
					)}
				</div>
				<div className={styles.statistics}>
					<div className={styles.statistics_item}>
						<AiFillEye />
						<span>{formatCompactNumber(video.views)} views</span>
					</div>
					<div className={styles.statistics_item}>
						<FaHeart />
						<span>{formatCompactNumber(video.likesCount)} likes</span>
					</div>
					<div className={styles.statistics_item}>
						<AiFillCalendar />
						<span>{dayjs(new Date(video.createdAt)).fromNow()}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoDetails
