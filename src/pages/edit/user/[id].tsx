import { NextPageAuth } from '@/app/providers/private-route.interface'
import UserEdit from '@/components/screens/user-edit/UserEdit'

const UserEditPage: NextPageAuth = () => {
	return <UserEdit />
}
UserEditPage.isOnlyUser
export default UserEditPage