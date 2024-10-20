/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				'scale-fade-in': {
					'0%': { transform: 'scale(0.5)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'fade-up': {
					'0%': { transform: 'translateY(50px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
			},
			animation: {
				'scale-fade': 'scale-fade-in 1s ease-in-out forwards',
				'fade-up': 'fade-up 1s ease-in-out forwards',
			},
		},
	},
	plugins: [],
};
