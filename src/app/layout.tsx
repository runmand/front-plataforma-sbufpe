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
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
