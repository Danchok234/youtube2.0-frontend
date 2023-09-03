import { useAuth } from '@/hooks/useAuth'
import { api } from '@/store/api/api'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toastr } from 'react-redux-toastr'
import { IMenuItem } from './menu.interface'
import style from './menu.module.scss'

interface IMenuItemComp {
	item: IMenuItem
}

export default function MenuItem({ item }: IMenuItemComp) {
	
	const { user } = useAuth()

	const { asPath } = useRouter()


	return (
		<li className={style['menu-item']}>
			<Link
				className={clsx(style.link, {
					[style.active]: asPath === item.link,
				})}
				href={(asPath === item.link || (item.link === "/subscriptions" && !user)) ? '' : item.link}
				onClick={e => asPath === item.link && e.preventDefault()}
			>
				<span onClick={()=>{(item.link === "/subscriptions" && !user) && toastr.info("Access rejected","You need to be registered to have access to this page!")}}>
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
