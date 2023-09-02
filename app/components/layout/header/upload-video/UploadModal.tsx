import { videoApi } from '@/store/api/video.api'
import { Dialog, Transition } from '@headlessui/react'
import { Ubuntu } from 'next/font/google'
import { FC, Fragment } from 'react'
import UploadVideoForm from './upload-video-form/UploadVideoForm'
import { IUploadModal } from './upload-video.interface'
import styles from './uploadVideo.module.scss'

const ubuntu = Ubuntu({ weight: ['300', '400', '500', '700'], subsets: ['latin'] })

const UploadModal: FC<IUploadModal> = ({ isOpen, setIsOpen, videoId }) => {
	const [deleteVideo] = videoApi.useDeleteVideoMutation()

	const handleCloseModal = () => {
		setIsOpen(false)
		deleteVideo(videoId)
	}

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className={styles.modal} onClose={handleCloseModal}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-25 z-[100]' />
				</Transition.Child>

				<div className='w-full fixed overflow-y-auto my-7 inset-0 z-[110]'>
					<div
						style={ubuntu.style}
						className="h-full flex justify-center w-full p-4 text-center" 
					>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='transform overflow-y-scroll rounded-2xl bg-grey-500 p-6 shadow-xl transition-all w-[60%] min-w-[320px] overflow-x-hidden lg:min-w-[52rem] min-h-[30rem] '>
								<UploadVideoForm videoId={videoId} setIsOpen={setIsOpen} />
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default UploadModal
