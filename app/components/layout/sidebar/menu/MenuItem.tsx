import { useAuth } from '@/hooks/useAuth'
import { api } from '@/store/api/api'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IMenuItem } from './menu.interface'
import style from './menu.module.scss'

interface IMenuItemComp {
	item: IMenuItem
}

export default function MenuItem({ item }: IMenuItemComp) {
	const { user } = useAuth()

	const { data: userProfile } = api.useGetProfileQuery(null, {
		skip: !user,
	})

	const { asPath } = useRouter()

	if (item.link === '/my-channel' && !user) return null
	if (item.link === '/my-channel' && userProfile) item.link = `/c/${userProfile.id}`

	return (
		<li className={style['menu-item']}>
			<Link
				className={clsx(style.link, {
					[style.active]: asPath === item.link,
				})}
				href={asPath === item.link ? '' : item.link}
				onClick={e => asPath === item.link && e.preventDefault()}
			>
				<span>
					{item.icon && <item.icon className={style.icon} />}
					{item.image && (
						<div className='flex items-center justify-center overflow-hidden rounded-full w-[40px] h-[40px]'>
							<Image
								className='rounded-full'
								src={item.image}
								width={40}
								height={40}
								alt='icon-image'
							/>
						</div>
					)}
					<b>{item.name}</b>
				</span>
			</Link>
		</li>
	)
}
