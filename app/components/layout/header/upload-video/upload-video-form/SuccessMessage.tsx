import { FC } from 'react'
import styles from "./uploadVideoForm.module.scss"

const SuccessMessage: FC = () => {
	return <div className={styles.successMessage}>
		Posting video is successful!
	</div>
}

export default SuccessMessage