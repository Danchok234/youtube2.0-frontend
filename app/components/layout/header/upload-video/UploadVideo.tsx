import { videoApi } from '@/store/api/video.api'
import { FC, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import UploadModal from './UploadModal'
import styles from './uploadVideo.module.scss'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'

const UploadVideo: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [videoId, setVideoId] = useState<number>(0)

	const [createVideo, { isLoading }] = videoApi.useCreateVideoMutation()

	const handleButtonClick = () => {
		createVideo()
			.unwrap()
			.then(id => {
				setIsOpen(true)
				setVideoId(+id)
			})
	}

	return (
		<>
			<button className={styles.uploadVideo} disabled={isLoading} onClick={handleButtonClick}>
				<FiUpload />
			</button>
			<UploadModal isOpen={isOpen} videoId={videoId} setIsOpen={setIsOpen} />
		</>
	)
}

export default UploadVideo
