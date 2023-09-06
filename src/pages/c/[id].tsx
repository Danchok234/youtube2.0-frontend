import Channel from '@/components/screens/channel/Channel'
import { IChannel } from '@/components/screens/channel/channel.interface'
import { UserService } from '@/services/user/user.service'
import { IUser } from '@/types/user.interface'
import { GetServerSideProps, NextPage } from 'next'

const ChannelPage: NextPage<IChannel> = ({ channel }) => {
	return <Channel channel={channel} />
}

export const getServerSideProps: GetServerSideProps = async context => {
	const { id } = context.query

	try {
		const { data: channel } = await UserService.getUser(Number(id))

		return {
			props: {
				channel,
			},
		}
	} catch (error) {
		return {
			props: {} as IUser,
		}
	}
}

export default ChannelPage
