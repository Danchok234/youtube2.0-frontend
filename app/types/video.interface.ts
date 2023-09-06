import { IBase } from './base.interface'
import { IComment } from './comment.interface'
import { IUser } from './user.interface'

export interface IVideo extends IBase {
	name?: string
	views: number
	likes?:ILike[]
	likesCount: number
	duration?: number
	isPublic?: boolean
	description: string
	videoPath: string
	thumbnailPath: string
	author?: IUser
	comments: IComment[]
}

export interface IVideoDto
	extends Pick<
		IVideo,
		'name' | 'isPublic' | 'description' | 'thumbnailPath' | 'videoPath' | 'id' | "duration"
	> {}

export interface ILike extends IBase {
	fromChannel:IUser,
	toVideo:IVideo
}