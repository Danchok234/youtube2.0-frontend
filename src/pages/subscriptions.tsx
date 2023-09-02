import { NextPageAuth } from '@/app/providers/private-route.interface'
import Subscriptions from '@/components/screens/subscriptions/Subscriptions'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/store/api/api'

const MySubscriptionsPage: NextPageAuth = () => {
	const { user } = useAuth()

	const { data: profile } = api.useGetProfileQuery(null, {
		skip: !user,
	})

	return <Subscriptions subscriptions={profile?.subscriptions} />
}

MySubscriptionsPage.isOnlyUser = true

export default MySubscriptionsPage
