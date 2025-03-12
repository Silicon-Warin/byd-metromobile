import { Inter } from "next/font/google";
import localFont from 'next/font/local';

export const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const prompt = localFont({
    src: [
        {
            path: '../public/fonts/Prompt/Prompt-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/Prompt/Prompt-Bold.ttf',
            weight: '700',
            style: 'normal',
        }
    ],
    variable: '--font-prompt'
});
