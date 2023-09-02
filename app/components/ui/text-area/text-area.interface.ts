import { TextareaHTMLAttributes } from 'react'
import { IFieldProps } from '../field/field.interface'

type TInputPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> & IFieldProps

export interface ITextArea extends TInputPropsField {}
