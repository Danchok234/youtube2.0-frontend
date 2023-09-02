import { IAuthInitialState } from '../store/auth/auth.interface'
import { useTypedSelector } from './useTypedSelector'

export const useAuth = (): IAuthInitialState => useTypedSelector(state => state.auth)
