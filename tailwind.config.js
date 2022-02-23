module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                primary: '#F15D22'
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp')
    ]
}
