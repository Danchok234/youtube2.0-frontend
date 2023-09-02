import clsx from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FC } from 'react'
import { formatCompactNumber } from '../../../utils/format-number'
import styles from './videoItem.module.scss'

interface IVideoStatistics {
	views: number
	createdAt: string
}

dayjs.extend(relativeTime)

const VideoStatistics: FC<IVideoStatistics> = ({ views, createdAt }) => {
	return (
		<div className={clsx("flex gap-1 text-sm font-light whitespace-nowrap", styles.statistics)}>
			<span>{formatCompactNumber(views)} views</span>
			<span className='font-medium'>&#183;</span>
			<span className={styles.createdAt}>{dayjs(new Date(createdAt)).fromNow()}</span>
		</div>
	)
}

export default VideoStatistics
