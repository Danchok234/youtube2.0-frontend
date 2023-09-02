import Heading from '@/components/ui/heading/Heading'
import VideoItem from '@/components/ui/video-item/VideoItem'
import { IVideo } from '@/types/video.interface'
import { FC } from 'react'
import styles from './catalog.module.scss'

interface ICatalog {
	newVideos?: IVideo[]
	profilePage?: boolean
	withTitle?: boolean,
	isUpdateLink?:boolean,
	removeHandler?:(id:number)=>void
}

const Catalog: FC<ICatalog> = ({ newVideos, profilePage = false, withTitle = true, isUpdateLink=false, removeHandler }) => {
	return (
		<div className={styles.recommended}>
			{withTitle && (
				<div className={styles.top_block}>
					<Heading title={profilePage ? 'Videos' : 'Recommended'} />
				</div>
			)}
			<div className={styles.catalog}>
				{newVideos && newVideos.length ? (
					newVideos.map(video => {
						return <VideoItem video={video} key={video.id} removeHandler={removeHandler} isUpdateLink={isUpdateLink} isGrey />
					})
				) : (
					<h2>No videos</h2>
				)}
			</div>
		</div>
	)
}

export default Catalog
