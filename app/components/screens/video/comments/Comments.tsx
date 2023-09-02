import ChannelInfo from '@/components/ui/channel-info/ChannelInfo'
import { useAuth } from '@/hooks/useAuth'
import { IComment } from '@/types/comment.interface'
import { FC } from 'react'
import AddComment from './AddComment'
import styles from './comments.module.scss'
import CommentItem from './CommentItem'

interface IComments {
	comments: IComment[]
	videoId: number
}

const Comments: FC<IComments> = ({ comments, videoId }) => {
	const { user } = useAuth()

	return (
		<div className={styles.comments}>
			<div className={styles.top_block}>Comments</div>
			<div className={styles.main}>
				{comments && comments.length ? (
					comments.map(comment => {
						return <CommentItem comment={comment} />
					})
				) : (
					<h2>No comments for this video yet</h2>
				)}
			</div>
			{user && <AddComment videoId={videoId} />}
		</div>
	)
}

export default Comments
