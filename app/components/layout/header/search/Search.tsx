import VideoItem from '@/components/ui/video-item/VideoItem'
import { useSearch } from '@/hooks/useSearch'
import clsx from 'clsx'
import { FiSearch } from 'react-icons/fi'
import styles from './search.module.scss'

export default function Search() {
	const { data, isSuccess, handleSearch, searchTerm } = useSearch()

	return (
		<div className={styles.search}>
			<input type='text' placeholder='Search' value={searchTerm} onChange={e => handleSearch(e)} />
			<div className={styles.icon_block}>
				<FiSearch className={styles.icon} />
			</div>

			<div
				className={clsx(styles['found_video-block'], {
					[styles.visible]: isSuccess,
					[styles.no_videos]: !data?.length
				})}
			>
				{isSuccess &&
					(data?.length ? (
						data?.map(video => {
							return (
									<VideoItem isGrey={false} video={video} isSmall key={video.id} />
							)
						})
					) : (
						<div className={"text-lg font-bold"}>No videos have been found!</div>
					))} 
			</div>
		</div>
	)
}
