import clsx from "clsx"
import { FC } from 'react'
import { MdCheckCircle, MdUpload } from "react-icons/md"
import styles from "./footer.module.scss"
import Button from '@/components/ui/button/Button'

interface IFooterForm {
	percent:number
	isUploaded:boolean
}

const FooterForm: FC<IFooterForm> = ({ percent, isUploaded }) => {
	
	const buttonStyle = !isUploaded
		? {
			backgroundColor: 'rgb(252, 165, 165)',
			
		  }
		: {}


	return <div className={styles.footer}>
		<div className={clsx(styles.status,{
			[styles['icon-uploaded']]:isUploaded
		})}>
			<MdCheckCircle className={styles["check-icon"]} />
			<MdUpload className={styles["upload-icon"]} />
			<span>
				{isUploaded ? "Video is uploaded" : `Uploading ${percent}%...`}
			</span>
		</div>	
		<div>
			<Button disabled={!isUploaded} style={buttonStyle}>{isUploaded?"Save":"Wait..."}</Button>
		</div>
	</div>
}

export default FooterForm