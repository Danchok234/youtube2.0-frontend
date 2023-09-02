import { forwardRef } from 'react'
import styles from "./textArea.module.scss"
import { ITextArea } from './text-area.interface'

const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(({ error, style, ...rest }, ref) => {
	return (
		<div className={styles.textarea} style={style}>
			<textarea ref={ref} {...rest} />
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	)
})

TextArea.displayName = 'TextArea'

export default TextArea
