import { IUser } from '@/types/user.interface'
import { FC } from 'react'
import { formatCompactNumber } from '../../../utils/format-number'
import Avatar from '../avatar/Avatar'
import styles from './channel-info.module.scss'

interface IChannelInfo {
	channel: IUser,
	withDescription?:boolean,
	message?:string
}

const ChannelInfo: FC<IChannelInfo> = ({ channel, withDescription = true, message }) => {
	
	return (
		<div className={styles.channel_info}>
			<div>
				<Avatar author={channel} />
				<div className={styles.info}>
					<div className={styles.name}>{channel.name || <h4 className='text-sm text-grey-400  whitespace-nowrap'>No channel name</h4> }</div>
					<div className={styles.subscribers}>
						{formatCompactNumber(channel.subscribersCount) + ' subscribers'}
					</div>
				</div>
			</div>
			{
				message ? <div className={"text-white font-medium"}>
				{message}
			</div> :
				withDescription && <div className={styles.description}>
				{channel.description ? channel.description : 'No description'}
			</div> 
			}
		</div>
	)
}

export default ChannelInfo
