import 'src/scss/globals.scss';
import type { Metadata } from 'next';
import { Montserrat, Space_Grotesk } from 'next/font/google';
import ContextComponent from 'src/components/context/context.component';
import AppInit from '@/components/app-init/app-init.component';

import 'src/components/internal/button/button.scss';
import AppConfig from '@/static/app.config';

const space_grotesk = Space_Grotesk({
	variable: '--font-grotesk',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: AppConfig.name,
	description: AppConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link
					href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css"
					rel="stylesheet"
				/>
			</head>
			<body className={space_grotesk.className}>
				<ContextComponent>
					<AppInit>{children}</AppInit>
				</ContextComponent>
			</body>
		</html>
	);
}
