import { useAuth } from '@/hooks/useAuth'
import { api } from '@/store/api/api'
import Link from 'next/link'
import Menu from './menu/Menu'
import { menuData } from './menu/menu.data'
import styles from './sidebar.module.scss'

export default function Sidebar() {
	const { user } = useAuth()

	const { data } = api.useGetProfileQuery(null, {
		skip: !user,
	})

	return (
		<aside className={styles.sidebar}>
			<Link className={styles.site_name} href='/'>
				<h1>Youtube 2.0</h1>
			</Link>
			<Menu title='Menu' items={menuData} />

			{user && (
				<Menu
					title='My Subscriptions'
					items={
						data?.subscriptions
							.map(({ toChannel }) => ({
								image: toChannel.avatarPath ? toChannel.avatarPath : '/default/user.png',
								name: toChannel.name,
								link: `/c/${toChannel.id}`,
							}))
							.slice(0, 5) || []
					}
				/>
			)}
		</aside>
	)
}
