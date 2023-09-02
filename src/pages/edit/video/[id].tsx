import { NextPageAuth } from '@/app/providers/private-route.interface'
import VideoEdit from '@/components/screens/video-edit/VideoEdit'

const VideoEditPage: NextPageAuth = () => {
	return <VideoEdit />
}

VideoEditPage.isOnlyUser

export default VideoEditPage