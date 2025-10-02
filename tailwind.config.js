/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class', // This is important - enables class-based dark mode
    theme: {
        extend: {
            colors: {
                // You can extend colors here if needed
            },
        },
    },
    plugins: [],
};
