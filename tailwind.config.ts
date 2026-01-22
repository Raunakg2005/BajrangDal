import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                saffron: {
                    50: '#fff5e6',
                    100: '#ffebcc',
                    200: '#ffd699',
                    300: '#ffc266',
                    400: '#ffad33',
                    500: '#ff9933', // Primary Saffron
                    600: '#e67a00',
                    700: '#cc6d00',
                    800: '#a35700',
                    900: '#7a4100',
                    950: '#4a2500', // Darker Saffron for footer
                },
                om: '#FF7722',
            },
            backgroundImage: {
                'om-pattern': "url('/bg-pattern.png')",
                'hero-gradient': "linear-gradient(to bottom, rgba(255,153,51,0.8), rgba(255,119,34,0.9))",
            }
        },
    },
    plugins: [],
};
export default config;
