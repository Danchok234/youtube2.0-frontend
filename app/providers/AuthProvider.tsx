import dynamic from 'next/dynamic'
import { FC, PropsWithChildren } from 'react'
import { TComponentAuthFields } from './private-route.interface'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {
	ssr: false,
})

const AuthProvider: FC<PropsWithChildren<TComponentAuthFields>> = ({
	children,
	Component: { isOnlyUser },
}) => {
	return !isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole children={children} Component={{ isOnlyUser }} />
	)
}

export default AuthProvider
