import { FC } from 'react'
import { FileTypeEnum, IUploadField } from './upload-field.interface'
import styles from './uploadField.module.scss'
import { useUploadFile } from './useUploadFile'
import { useAuth } from '@/hooks/useAuth'


const UploadField: FC<IUploadField> = ({ setIsChosen, setValue, folder, title, onChange, type }) => {

	const {accessToken} = useAuth()

	const { uploadFile } = useUploadFile(onChange,accessToken, setIsChosen, folder, setValue)

	return (
		<div className={styles.file}>
			{title && <h1>{title}</h1>}
			<label>
				<span>Choose file</span>
				<input accept={type===FileTypeEnum.VIDEO?"video/mp4,video/mkv, video/x-m4v,video/*":"image/*"} type='file' onChange={uploadFile} />
			</label>
		</div>
	)
}

export default UploadField
