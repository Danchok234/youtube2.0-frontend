'use client'
import style from './header.module.scss'
import RightIcons from './right-icons/RightIcons'
import Search from './search/Search'

export default function Header() {
	return (
		<header className={style.header}>
			<Search />
			<RightIcons />
		</header>
	)
}
