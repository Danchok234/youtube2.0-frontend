import { FC } from 'react'
import styles from "./heading.module.scss"

interface IHeading {
	title: string
}

const Heading: FC<IHeading> = ({ title }) => {
	return (
		<div className={styles.heading}>
			<h2>{title}</h2>
		</div>
	)
}

export default Heading
