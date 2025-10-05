/** @type {import('next').NextConfig} */

const BASE_URL = process.env.BASE_URL || 'http://localhost:4200'

const nextConfig = {
	swcMinify: true,
	poweredByHeader: false,
	images: {
		domains: ['localhost'],
	},
	env: {
		BASE_URL: process.env.BASE_URL,
	},
	async rewrites() {
		return {
			beforeFiles: [
				{
					source: '/api/:path*',
					destination: `${BASE_URL}/api/:path*`,
				},
				{
					source: '/uploads/:path*',
					destination: `${BASE_URL}/uploads/:path*`,
				},
			],
		}
	},
}

module.exports = nextConfig
