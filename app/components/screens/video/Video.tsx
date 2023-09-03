import Layout from '@/components/layout/Layout'
import { videoApi } from '@/store/api/video.api'
import { IVideo } from '@/types/video.interface'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import Comments from './comments/Comments'
import VideoDetails from './video-details/VideoDetails'
import VideoPlayer from './video-player/VideoPlayer'
import styles from "./video.module.scss"

const Video: FC = () => {
	const { query } = useRouter()

	const [updateViews] = videoApi.useUpdateViewsMutation()

	const { data: video = {} as IVideo } = videoApi.useGetVideoByIdQuery(Number(query.id), {
		skip:!query.id
	})

	useEffect(()=>{
		if(query.id) updateViews(Number(query.id))
	},[])

	return (
		<Layout title={video.name}>
			{/* <div className={styles.top_section}>
				<VideoPlayer videoPath={video.videoPath} />
				<Comments comments={ video.comments} videoId={video.id}/>
			</div>
			<div className={styles.bottom_section}>
				<VideoDetails video={video} />
			</div> */}
			<div className='w-full flex xl:flex-row flex-col gap-5 mt-4'>
				<div className='xl:w-2/3 w-full flex flex-col  gap-5'>
					<VideoPlayer videoPath={video.videoPath} />
					<VideoDetails video={video} />
				</div>
				<div className='xl:w-1/3 w-full xl:h-auto h-[22rem]'>
				<Comments comments={ video.comments} videoId={video.id}/>
				</div>
			</div>
		</Layout>
	)
}

export default Video
