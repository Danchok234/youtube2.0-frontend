import { useActiveElement } from '@/hooks/useActiveElement'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IVideoElement } from './video-player.interface'

export const usePlayer = () => {
	const videoRef = useRef<IVideoElement>(null)
	const activeElement = useActiveElement()

	const [isShowButton, setIsShowButton] = useState(true)
	const [videoState, setVideoState] = useState({
		isPlaying:false,
		currentTime:0,
		videoTime:0,
		progress:0
	})

	useEffect(()=>{
		const originalDuration = videoRef.current?.duration
		if(originalDuration) setVideoState(prev=>({
			...prev,
			videoTime:originalDuration
		}))
	}, [videoRef.current?.duration])

	const toggleVideo = useCallback(() => {
		if(!videoState.isPlaying){
			videoRef.current?.play()
			setVideoState(prev=>({
				...prev,
				isPlaying:true
			}))
		}else {
			videoRef.current?.pause()
			setVideoState(prev=>({
				...prev,
				isPlaying:false
			}))
		}

	},[videoState.isPlaying])

	const forward = () =>{
		if(videoRef.current) videoRef.current.currentTime += 15
	}

	const backward = () =>{
		if(videoRef.current) videoRef.current.currentTime -= 15
	}

	const fullscreen = () =>{

		const video = videoRef.current
		if(!video) return

		if(video.requestFullscreen){
			video.requestFullscreen()
		}else if (video.msRequestFullscreen){
			video.msRequestFullscreen()
		}else if (video.mozRequestFullscreen) {
			video.mozRequestFullscreen()
		}else if (video.webkitRequestFullscreen){
			video.webkitRequestFullscreen()
		}
	}

	useEffect(()=>{
		const video = videoRef.current
		if(!video) return

		const updateProgress = () =>{
			setVideoState(prev=>({
				...prev,
				currentTime:video.currentTime,
				progress:(video.currentTime/videoState.videoTime)*100
			}))
		}

		video.addEventListener("timeupdate", updateProgress);

		return () => {
			video.removeEventListener("timeupdate", updateProgress)
		}
	}, [videoState.videoTime])

	useEffect(()=>{

		const handleKeyDown = (e:KeyboardEvent) => {
			if(activeElement!.localName !== "input" && activeElement!.localName !== "textarea"){
				switch (e.key){
					case "ArrowRight":
						forward()
						break;
					case "ArrowLeft":
						backward()
						break;
					case " ":
						e.preventDefault()
						toggleVideo()
						break;
					case "f":
						fullscreen()
						break;
					
					default: return
			} }
		}

			document.addEventListener("keydown", handleKeyDown)
		return ()=>{
			document.removeEventListener("keydown", handleKeyDown)
		}
	}, [toggleVideo, activeElement])

	return {
		toggleVideo,
		videoState,
		videoRef,
		fullscreen,
	}
}