/** @type {import('next').NextConfig} */
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
					// destination: 'https://youtube2-0-backend.onrender.com/api/:path*',
					destination: 'http://localhost:4200/api/:path*',
				},
				{
					source: '/uploads/:path*',
					// destination: 'https://youtube2-0-backend.onrender.com/uploads/:path*',
					destination: 'http://localhost:4200/uploads/:path*',
				},
			],
		}
	},
}

module.exports = nextConfig
