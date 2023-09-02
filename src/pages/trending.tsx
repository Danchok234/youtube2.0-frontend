import Trending from '@/components/screens/trending/Trending'
import { ITrending } from '@/components/screens/trending/trending.interface'
import { VideoService } from '@/services/video/video.service'
import { GetStaticProps, NextPage } from 'next'

const TrendingPage: NextPage<ITrending> = ({ topVideos }) => {
	return <Trending topVideos={topVideos} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: topVideos } = await VideoService.getMostPopular()

		return {
			props: {
				topVideos,
			},
			revalidate: 60,
		}
	} catch (e) {
		return {
			props: {},
		}
	}
}

export default TrendingPage
