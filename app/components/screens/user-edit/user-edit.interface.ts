import { IUserDto } from '@/types/user.interface'

export interface IUserFields extends Omit<IUserDto, "id">{}