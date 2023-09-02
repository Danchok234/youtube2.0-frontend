import Field from '@/components/ui/field/Field'
import { commentApi } from '@/store/api/comment.api'
import { ICommentDto } from "@/types/comment.interface"
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { BiMailSend } from "react-icons/bi"
import styles from "./comments.module.scss"
import { usePlayer } from '../video-player/usePlayer'

interface IAddComment {
	videoId:number
}

const AddComment: FC<IAddComment> = ({videoId}) => {

	const {register, handleSubmit, reset, formState:{errors}} = useForm<ICommentDto>({mode:"onChange"})

	const [addComment, {isLoading}] = commentApi.useCreateCommentMutation()

	const onSubmit = (data:ICommentDto) => {
		addComment({...data, videoId}).unwrap().then(()=>reset())
	}

	return (<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
		<div className="relative">
		<input className={"w-[85%] h-9 bg-grey-500 p-2 rounded-lg outline-none"} {...register("commentText", {
			required:"Message is required!"
		})} placeholder='Comment...' />
		<button className={"absolute top-0 right-2 bg-grey-500 w-9 h-9 flex items-center justify-center rounded-xl text-xl"}>
			<BiMailSend />
		</button>
		</div>
	</form>)
}

export default AddComment