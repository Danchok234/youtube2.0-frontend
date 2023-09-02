import '@/styles/globals.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import NextProgressBar from 'nextjs-progressbar'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { PersistGate } from 'redux-persist/integration/react'
import AuthProvider from '../../app/providers/AuthProvider'
import { TComponentAuthFields } from '../../app/providers/private-route.interface'
import { persistor, store } from '../../app/store/store'

const queryClient = new QueryClient()

type TAppProps = AppProps & TComponentAuthFields

export default function App({ Component, pageProps }: TAppProps) {
	return (
		<>
			<NextProgressBar color='#FB5E41' startPosition={0.3} stopDelayMs={200} height={3} />
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<PersistGate persistor={persistor} loading={null}>
						<AuthProvider Component={Component}>
							<ReduxToastr
								timeOut={4000}
								newestOnTop={false}
								preventDuplicates={true}
								transitionIn='fadeIn'
								transitionOut='fadeOut'
								progressBar
								closeOnToastrClick
							/>
							<Component {...pageProps} />
						</AuthProvider>
					</PersistGate>
				</QueryClientProvider>
			</Provider>
		</>
	)
}
