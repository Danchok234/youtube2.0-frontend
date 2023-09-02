import { HiChartBar, HiCollection, HiHome, HiStar } from 'react-icons/hi'
import { IMenuItem } from './menu.interface'

export const menuData: IMenuItem[] = [
	{
		icon: HiHome,
		name: 'Home',
		link: '/',
	},
	{
		icon: HiChartBar,
		name: 'Trending',
		link: '/trending',
	},
	{
		icon: HiStar,
		name: 'My Channel',
		link: '/my-channel',
	},
	{
		icon: HiCollection,
		name: 'My subscriptions',
		link: '/subscriptions',
	},
]
