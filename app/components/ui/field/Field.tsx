import { forwardRef } from 'react'
import { IField } from './field.interface'
import styles from './field.module.scss'
import clsx from 'clsx'

const Field = forwardRef<HTMLInputElement, IField>(
	({ error, type = 'text', style, className, ...rest }, ref) => {
		return (
			<div className={clsx(styles['input-field'])} style={style}>
				<input type={type} ref={ref} {...rest} />
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
