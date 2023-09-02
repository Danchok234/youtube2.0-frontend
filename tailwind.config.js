/** @type {import('tailwindcss').Config} */

const colors = {
	orange: '#FB5E41',
	grey: {
		"400": "#6A6C7D",
		"500":"#1C1E2A",
		"600": '#282633',
	},
}

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: colors,
		},
		screens: {
			"sm": "576px",
			"md": "767px",
			"lg":"1024px",
			"xl":"1280px",
		},
	},
	plugins: [],
}
