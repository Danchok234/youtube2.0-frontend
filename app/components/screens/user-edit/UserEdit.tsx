import Layout from '@/components/layout/Layout'
import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/field/Field'
import TextArea from '@/components/ui/text-area/TextArea'
import UploadField from '@/components/ui/upload-field/UploadField'
import { FileTypeEnum } from '@/components/ui/upload-field/upload-field.interface'
import { useAuth } from '@/hooks/useAuth'
import { IMediaResponse } from '@/services/media/media.interface'
import { api } from '@/store/api/api'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { toastr } from 'react-redux-toastr'
import EmailVerification from './EmailVerification'
import { IUserFields } from './user-edit.interface'

const UserEdit: FC = () => {
	const { query, push } = useRouter()

	const authUser = useAuth()

	const userId = Number(query.id)

	if (!authUser.user) push('/')

	const [isShowPasswordSymblos, setIsShowPasswordSymblos] = useState(false)

	const { data: user, isLoading } = api.useGetProfileQuery(null, {
		skip: !userId,
	})

	const [updateUserInfo] = api.useUpdateUserInfoMutation()

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors },
		setValue,
	} = useForm<IUserFields>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<IUserFields> = data => {
		console.log('updating...')
		if (user) {
			updateUserInfo(
				data.password
					? { ...data, id: userId }
					: { ...data, password: user.password, id: userId }
			)
				.unwrap()
				.then(() => {
					toastr.success('Status', 'Success Updating!')
					push(`/c/${query.id}`)
				})

			console.log('updated')
		}
	}

	useEffect(() => {
		if (user) {
			setValue('name', user.name)
			setValue('avatarPath', user.avatarPath)
			setValue('description', user.description)
			setValue('email', user.email)
			setValue('password', user.password)
		}
	}, [user])

	return (
		<Layout title='User edit'>
			<form
				className='flex-col justify-start md:flex-row flex flex-wrap w-full mt-10 ml-2'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='md:w-7/12 w-full flex-col gap-3 pr-5'>
					<Field
						{...register('name', {
							required: 'You must have a name!',
							maxLength: {
								value: 20,
								message: 'Max username length is 20!',
							},
						})}
						placeholder='Name'
						error={errors.name}
					/>
					<TextArea {...register('description')} placeholder='Description' />
					<div className='flex md:flex-row flex-col items-center justify-center gap-4 my-4'>
						<Field
							{...register('email', {
								required: 'You must have an email!',
								pattern: {
									value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
									message: 'Your email isn`t valid!',
								},
							})}
							style={{ marginBottom: '0px' }}
							placeholder='Email'
							type='email'
							error={errors.email}
						/>
						{user && <EmailVerification isVerified={user?.isVerified} />}
					</div>
					<div className='flex items-center relative'>
						<Field
							{...register('password', {
								minLength: {
									value: 8,
									message: 'Minimum password length = 8 symbols!',
								},
							})}
							placeholder='New Password'
							type={isShowPasswordSymblos ? 'text' : 'password'}
							error={errors.password}
						/>
						<button
							onClick={() => setIsShowPasswordSymblos(prev => !prev)}
							type='button'
							className='h-8 w-9 text-lg flex items-center justify-center absolute bg-grey-600 top-0 right-0 rounded-r-xl'
						>
							{isShowPasswordSymblos ? <AiFillEyeInvisible /> : <AiFillEye />}
						</button>
					</div>
				</div>
				<div className='md:w-5/12 w-full flex flex-col md:items-start items-center pl-2 gap-4'>
					<div className=' flex items-center justify-center overflow-hidden rounded-full w-[10rem] h-[10rem] bg-grey-400 ml-5'>
						{watch('avatarPath') ? (
							<Image
								src={watch('avatarPath')}
								alt='avatar'
								className='rounded-full'
								width={160}
								height={160}
								loading='lazy'
							/>
						) : (
							<h2 className='text-grey-500 '>Select avatar!</h2>
						)}
					</div>
					<Controller
						control={control}
						name='avatarPath'
						render={({ field: { onChange } }) => (
							<UploadField
								onChange={(value: IMediaResponse) => {
									onChange(value.url)
								}}
								type={FileTypeEnum.THUMBNAIL}
								folder='avatars'
							/>
						)}
					/>
				</div>
				<Button type='submit' className='mt-10'>
					{isLoading ? 'Wait...' : 'Save'}
				</Button>
			</form>
		</Layout>
	)
}

export default UserEdit
