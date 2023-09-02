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
				destination: 'http://localhost:4200/api/:path*',
			},
			{
				source: '/uploads/:path*',
				destination: 'http://localhost:4200/uploads/:path*',
			},
		]
	},
}

module.exports = nextConfig
