import { IVideo } from '@/types/video.interface'
import { FC } from 'react'
import styles from "./videoItem.module.scss"

interface IVideoDuration {
	duration?:number
}

const VideoDuration: FC<IVideoDuration> = ({duration}) => {

	return <div className={styles.duration}>{duration} min.</div>
}

export default VideoDuration