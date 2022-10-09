/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"bg-default": "rgb(254 242 242)", // 統一背景顏色
			},
			width: {
				"w-main": "1000px", // 主畫面內容固定寬度
			},
		},
	},
	plugins: [],
};
