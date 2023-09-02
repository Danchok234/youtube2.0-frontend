/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	poweredByHeader: false,
	images: {
		domains: ['localhost'],
	},
	env: {
		BASE_URL:process.env.BASE_URL
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://youtube2-0-backend.onrender.com/api/:path*',
			},
			{
				source: '/uploads/:path*',
				destination: 'https://youtube2-0-backend.onrender.com/uploads/:path*',
			},
		]
	},
}

module.exports = nextConfig
