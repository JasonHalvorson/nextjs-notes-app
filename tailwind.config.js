module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                16: 'repeat(16, minmax(0, 1fr))',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
