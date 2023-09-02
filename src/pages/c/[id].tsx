import Channel from '@/components/screens/channel/Channel'
import { IChannel } from '@/components/screens/channel/channel.interface'
import { UserService } from '@/services/user/user.service'
import { IUser } from '@/types/user.interface'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

const ChannelPage: NextPage<IChannel> = ({ channel }) => {
	return <Channel channel={channel} />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: channel } = await UserService.getUser(Number(params?.id))

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

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: users } = await UserService.getAll()

		const paths = users.map(item => ({
			params: {
				id: String(item.id),
			},
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export default ChannelPage
