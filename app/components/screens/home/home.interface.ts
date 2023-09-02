import { IVideo } from '../../../types/video.interface'

export interface IHome {
	newVideos: IVideo[]
	topVideo: IVideo
	randomVideo: IVideo
}
