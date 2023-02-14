/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config; */

const tailwindConfig = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //顏色原則上同步於naive ui色調
        "wte-bg": "rgb(254 242 242)", // 統一背景顏色(粉紅)
        "wte-blue-bg": "#e2e8f0",
        "wte-danger": "rgb(210,55,85)", //紅色 (警告,錯誤等)
        "wte-warning": "rgb(252,176,64)", //黃色
        "wte-success": "rgb(27,162,90)", //綠色
        "wte-primary": "rgb(27,162,90)", //主網站色調
      },
      width: {
        "wte-main": "1000px", // 主畫面內容固定寬度
      },
    },
  },
  plugins: [],
};
module.exports = tailwindConfig;
