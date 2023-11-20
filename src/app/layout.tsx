import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

import AppInit from 'src/components/app-init/app-init.component';
import ContextComponent from 'src/components/context/context.component';

import AppConfig from 'src/static/app.config';

import 'src/scss/globals.scss';

const space_grotesk = Space_Grotesk({
	variable: '--font-grotesk',
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
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
					rel="stylesheet"
					href={`https://kit.fontawesome.com/${process.env.NEXT_PUBLIC_FONTAWESOME_KEY}.css`}
					crossOrigin="anonymous"
				/>
			</head>
			<body className={space_grotesk.variable}>
				<ContextComponent>
					<AppInit>{children}</AppInit>
				</ContextComponent>
			</body>
		</html>
	);
}
