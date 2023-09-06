import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useOutside } from '@/hooks/useOutside'
import { api } from '@/store/api/api'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { CgChevronDown, CgChevronUp } from 'react-icons/cg'
import styles from './profileMenu.module.scss'

const ProfileMenu: FC = () => {
	const { user } = useAuth()

	const { data, isLoading } = api.useGetProfileQuery(null, {
		skip: !user,
		refetchOnMountOrArgChange: true,
	})

	const { logout } = useActions()

	const handleLogout = () => {
		logout()
	}

	const { ref, isShow, setIsShow } = useOutside(false)

	if (isLoading) return <div>Loading...</div>
	return (
		<div ref={ref} className={styles.profile_menu}>
			<button onClick={() => setIsShow(!isShow)}>
				<div className='flex rounded-full w-[40px] h-[40px] items-center justify-center overflow-hidden'>
					<Image
						src={data?.avatarPath ? data.avatarPath : '/default/user.webp'}
						width={40}
						height={40}
						alt={data?.name || ''}
						priority
					/>
				</div>
				<span>{data?.name}</span>
				{isShow ? <CgChevronUp className={styles.svg} /> : <CgChevronDown className={styles.svg} />}
			</button>
			<ul
				className={clsx(styles.list, {
					[styles.open]: isShow,
				})}
			>
				<li>
					<Link href={`/c/${user?.id}`}>My Channel</Link>
				</li>
				<li>
					<Link href={`/edit/user/${user?.id}`}>Update My Info</Link>
				</li>
				<li>
					<Link href={'/studio'}>Studio</Link>
				</li>
				<li>
					<button onClick={() => handleLogout()}>LogOut</button>
				</li>
			</ul>
		</div>
	)
}

export default ProfileMenu
