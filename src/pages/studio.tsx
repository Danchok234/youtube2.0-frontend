import { NextPageAuth } from '@/app/providers/private-route.interface'
import Studio from '@/components/screens/Studio'

const StudioPage: NextPageAuth = () => {
	return <Studio />
}

StudioPage.isOnlyUser = true

export default StudioPage
