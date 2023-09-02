import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'
import Auth from '../auth/Auth'
import ProfileMenu from '../profile-menu/ProfileMenu'
import UploadVideo from '../upload-video/UploadVideo'

const RightIcons: FC = () => {
	
	const { user } = useAuth()

	const content = user ? (
		<div className='flex sm:justify-center justify-between sm:w-[12rem] items-center gap-6 w-full'>
			<ProfileMenu />
			<UploadVideo />
		</div>
	) : (
		<Auth />
	)

	return content
}

export default RightIcons
