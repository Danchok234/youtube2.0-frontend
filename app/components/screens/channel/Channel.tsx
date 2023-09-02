import Layout from '@/components/layout/Layout'
import ChannelInfo from '@/components/ui/channel-info/ChannelInfo'
import SubscribeButton from '@/components/ui/subscribe-button/SubscribeButton'
import { FC } from 'react'
import Catalog from '../home/catalog/Catalog'
import { IChannel } from './channel.interface'
import styles from './channel.module.scss'

const Channel: FC<IChannel> = ({ channel }) => {
	return (
		<Layout title={channel.name} description={channel.description}>
			<div className={styles.channel}>
				<div className={styles.channel_info}>
					<ChannelInfo channel={channel} />
					<SubscribeButton toChannelId={channel.id} />
				</div>
				<Catalog newVideos={channel.videos || []} profilePage={true}/>
			</div>
		</Layout>
	)
}

export default Channel
