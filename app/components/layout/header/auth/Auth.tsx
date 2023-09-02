import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/field/Field'
import { useActions } from '@/hooks/useActions'
import { useOutside } from '@/hooks/useOutside'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaUserCircle } from "react-icons/fa"
import { IAuthFields } from './auth.interface'
import styles from "./auth.module.scss"
import { validEmail } from './auth.valid'

export enum FormTypeEnum {
	REGISTER="register",
	LOGIN="login"
}

const Auth: FC = () => {

	const { isShow, setIsShow, ref } = useOutside(false)

	const [formType, setFormType] = useState<FormTypeEnum>(FormTypeEnum.REGISTER)

	const {register, handleSubmit, formState:{errors}} = useForm<IAuthFields>({mode:"onChange"})

	const {register:registerUser, login} = useActions()

	const onSubmit:SubmitHandler<IAuthFields> = async (data) =>{
			if(formType === FormTypeEnum.REGISTER) registerUser(data)
		else if (formType === FormTypeEnum.LOGIN) login(data)
		
	}

	return (
	<div ref={ref} className={styles.auth}>
		<button onClick={()=>setIsShow(!isShow)}>
		<FaUserCircle className={styles.button} />
		</button>
		{
			isShow && <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Field {...register("email", {
				required:"This field is required!",
				pattern:{
					value:validEmail,
					message:"Email isn`t right!"
				}
			})} placeholder='Email' error={errors.email}/>
			<Field {...register("password", {
				required:"This field is required!"
			})} placeholder='Password' type='password' error={errors.password} />
			<Button type='submit' style={{marginTop:"0.5rem"}}>
				{
					formType === FormTypeEnum.REGISTER ? "Register" : "Login"
				}
			</Button>
			<button type='button' onClick={()=>setFormType(formType === FormTypeEnum.REGISTER ? FormTypeEnum.LOGIN : FormTypeEnum.REGISTER)} className={styles.change_type_button}>{formType === FormTypeEnum.REGISTER ? "Login" : "Register"}</button>
		</form>
		}
		
	</div>
	)
}

export default Auth