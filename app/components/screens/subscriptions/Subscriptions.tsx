import Layout from '@/components/layout/Layout'
import ChannelInfo from '@/components/ui/channel-info/ChannelInfo'
import VideoItem from '@/components/ui/video-item/VideoItem'
import { FC } from 'react'
import { ISubscriptions } from './subscriptions.interface'
import styles from './subscriptions.module.scss'

const Subscriptions: FC<ISubscriptions> = ({ subscriptions }) => {
	if (!subscriptions?.length)
		return (
			<Layout title='subscriptions' description='Your subscriptions'>
				{' '}
				<h2 className='text-2xl font-bold ml-10 mt-10'>No Subscriptions</h2>
			</Layout>
		)

	return (
		<Layout title='subscriptions' description='Your subscriptions'>
			<div className={styles.wrapper}>
				{subscriptions.map(({ toChannel }) => {
					return (
						<div className={styles.element}>
							<ChannelInfo withDescription={false} channel={toChannel} />
							<div className={styles.videos}>
								{toChannel.videos ? (
									toChannel.videos.slice(0, 3).map(video => {
										return <VideoItem isGrey={true} video={video} key={video.id} isSmall />
									})
								) : (
									<h2>No videos</h2>
								)}
							</div>
						</div>
					)
				})}
			</div>
		</Layout>
	)
}

export default Subscriptions
