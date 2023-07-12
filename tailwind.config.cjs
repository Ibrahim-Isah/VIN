/** @type {import('tailwindcss').Config} */
export default {
	content: ['./public/index.html', './src/**/*.{html,js,ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				backImage: 'url(/images/bg.jpg)',
			},
		},
	},
	plugins: [],
};
