import { useAuth } from '@/hooks/useAuth'
import { api } from '@/store/api/api'
import clsx from 'clsx'
import { FC } from 'react'
import { BsPersonPlusFill } from 'react-icons/bs'
import styles from './subscribe-button.module.scss'

interface ISubscribeButton {
	toChannelId: number
}

const SubscribeButton: FC<ISubscribeButton> = ({ toChannelId }) => {
	const { user } = useAuth()

	const { data: profile } = api.useGetProfileQuery(null, {
		skip: !user,
	})

	const [subscribe, { data, isLoading }] = api.useSubscribeToChannelMutation()

	if (user?.id === toChannelId) return null

	const isSubscribed = profile?.subscriptions.some(sub => sub.toChannel.id === toChannelId) || !!data

	return (
		<>
			{user && (
				<button
					className={clsx(styles.button, {
						[styles.subscribed]: isSubscribed,
					})}
					onClick={() => subscribe(toChannelId).unwrap()}
					disabled={isLoading}
				>
					<BsPersonPlusFill />
					{isSubscribed ? 'Subscribed' : 'Subscribe'}
				</button>
			)}
		</>
	)
}

export default SubscribeButton
