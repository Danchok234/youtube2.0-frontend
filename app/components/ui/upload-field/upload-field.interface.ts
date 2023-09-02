import { Dispatch, SetStateAction } from 'react'


export enum FileTypeEnum{
	VIDEO="video",
	THUMBNAIL="thumbnail"
}

export interface IUploadField {
	title?: string
	onChange: (...event: any) => void
	type:FileTypeEnum
	folder?: string
	setValue?: (val: number) => void
	setIsChosen?: Dispatch<SetStateAction<boolean>>
}
