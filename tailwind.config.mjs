/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily:{
			'poppins': ['Poppins', 'sans-serif'],
			'notosans': ['"Noto Sans KR ExtraLight"', 'sans-serif']
		},
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
