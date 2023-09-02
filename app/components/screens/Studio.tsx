import { api } from '@/store/api/api'
import { videoApi } from '@/store/api/video.api'
import { FC } from 'react'
import Layout from '../layout/Layout'
import Catalog from './home/catalog/Catalog'

const Studio: FC = () => {
	const { data: user } = api.useGetProfileQuery(null)

	const [removeVideo] = videoApi.useDeleteVideoMutation()

	const removeHandler = async (id: number) => {
		removeVideo(id)
		console.log('remove video')
	}

	const videos = user?.videos

	return (
		<Layout title={'Studio'}>
			<div style={{ marginTop: '1rem' }}>
				{videos?.length ? (
					<Catalog profilePage newVideos={videos} isUpdateLink removeHandler={removeHandler} />
				) : (
					<h2> No videos have been found on your account</h2>
				)}
			</div>
		</Layout>
	)
}

export default Studio
