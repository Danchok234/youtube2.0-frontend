import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IVideo } from '../../../types/video.interface'
import Avatar from '../avatar/Avatar'
import VideoDuration from './VideoDuration'
import VideoStatistics from './VideoStatistics'
import styles from './videoItem.module.scss'
import clsx from "clsx"

interface ILargeVideoItem {
	video: IVideo
}

const LargeVideoItem: FC<ILargeVideoItem> = ({ video }) => {
	return (
		<Link href={`/v/${video.id}`} className={styles.large_video_item}>
				<Image alt={"video"} src={video.thumbnailPath ? video.thumbnailPath : "/default/video-thumbnail/images.png"} priority fill quality={100} />
			<VideoDuration duration={video.duration}/>
			<div className={styles.info}>
				<div className={"text-2xl font-medium line-clamp-2"}>{ video.name}</div>
				<div className={clsx("w-[80%] text-lg line-clamp-3")}>{video.description}</div>
				{video.author && (
					<div className={"flex gap-2 items-center"}>
						<Avatar author={video.author} />
						<div>
							<div className='text-lg tracking-wide'>{video.author.name}</div>
							<VideoStatistics views={video.views} createdAt={video.createdAt} />
						</div>
					</div>
				)}
			</div>
		</Link>
	)
}

export default LargeVideoItem
