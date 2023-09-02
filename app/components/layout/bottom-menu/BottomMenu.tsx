import { FC } from 'react'
import Menu from '../sidebar/menu/Menu'
import styles from './bottomMenu.module.scss'
import { menuData } from '../sidebar/menu/menu.data'

const BottomMenu: FC = () => {
	return (
		<div className={styles.bottomMenu}>
			<Menu items={menuData} />
		</div>
	)
}

export default BottomMenu
