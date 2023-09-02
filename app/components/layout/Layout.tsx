import { Ubuntu } from 'next/font/google'
import { FC, PropsWithChildren } from 'react'
import Header from './header/Header'
import styles from './layout.module.scss'
import Meta from './meta/Meta'
import Sidebar from './sidebar/Sidebar'
import BottomMenu from './bottom-menu/BottomMenu'

const ubuntu = Ubuntu({ weight: ['300', '400', '500', '700'], subsets: ['latin'] })

interface ILayout {
	title?: string
	description?: string
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, title, description }) => {
	return (
		<>
			<Meta title={title} description={description} />
			<BottomMenu />
			<main style={ubuntu.style} className={styles.main}>
				<Sidebar />
				<section className={styles.content}>
					<Header />
					<div className='max-w-[1200px] '>{children}</div>
				</section>
			</main>
		</>
	)
}

export default Layout
