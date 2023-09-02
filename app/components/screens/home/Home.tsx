import Layout from '@/components/layout/Layout'
import { FC } from 'react'
import Discover from './discover/Discover'
import { IHome } from './home.interface'
import styles from './home.module.scss'
import Catalog from './catalog/Catalog'

const Home: FC<IHome> = ({ newVideos, topVideo, randomVideo }) => {
	return (
		<Layout title={'Home'} description={'The copy of youtube'}>
			<div className={styles.home}>
				{(topVideo && randomVideo) ? <Discover topVideo={topVideo} randomVideo={randomVideo} /> :
					<h3>No Top Videos</h3>
				}

				{
					newVideos ? <Catalog newVideos={newVideos} /> : <h3>No Videos</h3>
				}
				
			</div>
		</Layout>
	)
}

export default Home
