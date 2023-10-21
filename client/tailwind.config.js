/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./routes/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#7C5BA9',
            }
        }
    },
    plugins: [],
}