import { IBase } from './base.interface'
import { IVideo } from './video.interface'

export interface IUser extends IBase {
	email: string
	name: string
	password:string
	isVerified: boolean
	subscribersCount: number
	description: string
	avatarPath: string
	videos?: IVideo[]
	subscriptions: ISubscription[]
}

export interface IUserDto extends Pick<IUser, "id"|"email"|"password"|"avatarPath"|"name"|"description">{}

export interface ISubscription extends IBase{
	toChannel:IUser
}
