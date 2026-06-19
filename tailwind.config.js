/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'gb-primary': '#6D141A',
                'gb-secondary': '#921c22',
                'gb-bg': '#FAF7F2',
                'gb-text': '#1c1917',
                'gb-muted': '#78716c',
                'gb-label': '#a8a29e',
                'gb-border': '#e7e5e4',
                'gb-input': '#f5f5f4',
            },
            fontFamily: {
                display: ["'Lora'", 'Georgia', 'serif'],
                body: ["'Source Sans 3'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
