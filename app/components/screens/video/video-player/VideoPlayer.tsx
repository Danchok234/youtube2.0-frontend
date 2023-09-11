import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { IoMdPause, IoMdPlay } from 'react-icons/io'
import { RxEnterFullScreen } from 'react-icons/rx'
import { usePlayer } from './usePlayer'
import styles from './videoPlayer.module.scss'

interface IVideoPlayer {
	videoPath: string
}

const VideoPlayer: FC<IVideoPlayer> = ({ videoPath }) => {

	const [isIphone, setIsIphone] = useState(false)

	const { toggleVideo, videoRef, videoState, fullscreen } = usePlayer()

	useEffect(() => {
		if (/iPhone|iPad/.test(navigator.userAgent)) {
			setIsIphone(true)
		} else {
			setIsIphone(false)
		}
	}, [])

	return (
		<div className={styles.wrapper}>
			<video
				src={`${videoPath}`}
				playsInline
				controls={isIphone ? true : false}
				preload='metadata'
				onClick={isIphone ? () => {} : toggleVideo}
				ref={videoRef}
				width={300}
				height={300}
			/>
			<div
				className={clsx(styles.controls, {
					[styles.hide]: videoState.isPlaying,
					[styles.fullyHidden]:isIphone
				})}
			>
				<button onClick={toggleVideo}>{videoState.isPlaying ? <IoMdPause /> : <IoMdPlay />}</button>

				<div className={styles.progressBarWrapper}>
					<div className={styles.progressBar} style={{ width: `${videoState.progress}%` }} />
				</div>

				<div className={styles.time}>
					<p>
						{Math.floor(videoState.currentTime / 60) +
							':' +
							('0' + Math.floor(videoState.currentTime % 60)).slice(-2)}
					</p>
					<p>/</p>
					<p>
						{Math.floor(videoState.videoTime / 60) +
							':' +
							('0' + Math.floor(videoState.videoTime % 60)).slice(-2)}
					</p>
				</div>

				<button className={styles.fullscreen} onClick={fullscreen}>
					<RxEnterFullScreen className={styles.fullscreenButton} />
				</button>
			</div>
		</div>
	)
}

export default VideoPlayer
