import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { BsCheck } from 'react-icons/bs'

import { IUser } from '@/types/user.interface'
import styles from './avatar.module.scss'

interface IAvatar {
	author: IUser
	isSmall?: boolean
}

const Avatar: FC<IAvatar> = ({ author, isSmall = false }) => {
	return (
		<Link
			className={clsx(styles.avatar, {
				[styles.small]: isSmall,
			})}
			href={`/c/${author.id}`}
		>
			<div className={`${isSmall ? "w-[25px] h-[25px]" : "w-[35px] h-[35px]"} flex items-center justify-center overflow-hidden rounded-full `}>
				<Image
					src={author.avatarPath ? author.avatarPath : '/default/user.webp'}
					width={isSmall ? 25 : 35}
					height={isSmall ? 25 : 35}
					alt={author.name}
				/>
			</div>
			{author.isVerified && (
				<span className={styles.isVerified}>
					<BsCheck color='white' />
				</span>
			)}
		</Link>
	)
}

export default Avatar
