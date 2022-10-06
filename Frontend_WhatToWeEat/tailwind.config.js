/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"bg-default": "rgb(254 242 242)", //main color of this website
			},
		},
	},
	plugins: [],
};
