import type { Metadata } from 'next';
import Providers from './providers';
import '../styles/globals.css';
import '../src/css/index.css';
import '../src/css/login.css';
import '../src/css/register.css';

export const metadata: Metadata = {
	title: 'GestBucal SD',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-BR'>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
