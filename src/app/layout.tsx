import type { Metadata } from 'next';
import '../../styles/globals.css';
import '../css/index.css';
import '../css/login.css';
import '../css/register.css';
import '../css/table.css';
import '../css/sendData.css';
import Providers from './providers';

export const metadata: Metadata = {
    title: 'GestBucal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
