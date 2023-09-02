import MenuItem from './MenuItem'
import { IMenuItem } from './menu.interface'
import style from './menu.module.scss'

interface IMenu {
	title?: string
	items?: IMenuItem[]
}

export default function Menu({ title, items }: IMenu) {
	return (
		<div className={style.menu}>
			{title && <h3>{title.toUpperCase()}</h3>}
			{items?.length ? (
				<ul>
					{items.map((item: IMenuItem) => {
						return <MenuItem item={item} key={item.name} />
					})}
				</ul>
			) : (
				<h2 className={style.fallback}>You aren`t subscribed to any channel</h2>
			)}
		</div>
	)
}
