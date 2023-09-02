import Button from '@/components/ui/button/Button'
import { emailConfirmationApi } from '@/store/api/emailConfirm.api'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

interface IEmailVerification {
	isVerified: boolean
}

const EmailVerification: FC<IEmailVerification> = ({ isVerified }) => {
	const { query } = useRouter()

	const emailToken = query?.token

	const [isEmailMsgSent, setIsEmailMsgSent] = useState(false)

	const [sendVerificationLink] = emailConfirmationApi.useResendVerificationLinkMutation()
	const [verifyEmail] = emailConfirmationApi.useVerifyEmailMutation()

	const onVerify = () => {
		sendVerificationLink(null)
			.unwrap()
			.then(() => {
				setIsEmailMsgSent(true)
			})
	}

	useEffect(() => {
		if (emailToken) {
			verifyEmail({ token: String(emailToken) })
		}
	}, [])

	return (
		<>
			{!isVerified ? (
				!emailToken ? (
					isEmailMsgSent ? (
						<h3 className='text-sm text-grey-400 text-center'>Check your email!</h3>
					) : (
						<Button type='button' onClick={() => onVerify()} className='whitespace-nowrap'>
							Verify Email
						</Button>
					)
				) : (
					<h3>Verifying...</h3>
				)
			) : (
				<h3 className='text-sm text-grey-400 text-center'>You are verified! ✅</h3>
			)}
		</>
	)
}

export default EmailVerification
