import Layout from '@/components/layout/Layout'
import { FC } from 'react'
import Catalog from '../home/catalog/Catalog'
import { ITrending } from './trending.interface'
import styles from "./trending.module.scss"

const Trending: FC<ITrending> = ({ topVideos }) => {
	return (
		<Layout title={'Trending'} description={'The most trending videos right now'}>
			<div className={styles.wrapper}>
				<Catalog newVideos={topVideos} />
			</div>
		</Layout>
	)
}

export default Trending
