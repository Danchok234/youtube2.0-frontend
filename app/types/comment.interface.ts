import { IBase } from './base.interface'
import { IUser } from './user.interface'
import { IVideo } from './video.interface'

export interface IComment extends IBase{
	author: IUser
	video: IVideo
	commentText:string
}

export interface ICommentDto extends Pick<IComment, "commentText">{
	videoId:number
}