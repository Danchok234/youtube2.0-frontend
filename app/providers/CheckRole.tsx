import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'
import { TComponentAuthFields } from './private-route.interface'

const CheckRole: FC<PropsWithChildren<TComponentAuthFields>> = ({
	children,
	Component: { isOnlyUser },
}) => {
	const { user, isLoading } = useAuth()
	const { pathname, replace } = useRouter()

	const Children = () => <>{children}</>

	if (isLoading) return null

	if (user) return <Children />

	if (isOnlyUser) pathname !== '/' && replace('/')
	
	return null
}

export default CheckRole
