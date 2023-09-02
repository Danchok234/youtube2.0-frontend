import ChannelInfo from '@/components/ui/channel-info/ChannelInfo'
import { IComment } from '@/types/comment.interface'
import { FC } from 'react'
import styles from './comments.module.scss'

interface ICommentItem {
	comment: IComment
}

const CommentItem: FC<ICommentItem> = ({ comment }) => {
	return (
		<div className={styles.commentItem}>
			<ChannelInfo message={comment.commentText} channel={comment.author} withDescription={false} />
		</div>
	)
}

export default CommentItem
