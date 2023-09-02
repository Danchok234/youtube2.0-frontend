import Home from '@/components/screens/home/Home'
import { IHome } from '@/components/screens/home/home.interface'
import { VideoService } from '@/services/video/video.service'
import { shuffle } from 'lodash'
import { GetStaticProps, NextPage } from 'next'
import { IVideo } from '../../app/types/video.interface'

const HomePage: NextPage<IHome> = props => {
	return <Home {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: newVideos } = await VideoService.getAllVideos()
		const { data: topVideos } = await VideoService.getMostPopular()

		return {
			props: {
				newVideos,
				topVideo: topVideos[0] || {},
				randomVideo:
					shuffle(newVideos.filter(video => video.id !== topVideos[0].id))[0] || ({} as IVideo),
			},
		}
	} catch (error) {
		return {
			props: {
				newVideos: [],
				topVideo: {},
				randomVideo: {},
			},
		}
	}
}

export default HomePage
