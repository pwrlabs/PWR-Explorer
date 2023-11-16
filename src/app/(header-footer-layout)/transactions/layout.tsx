import { Metadata } from 'next';

import AppConfig from 'src/static/app.config';

export const metadata: Metadata = {
	title: `Txns | ${AppConfig.name} `,
};

export default function AccLayout({ children }: any) {
	return children;
}
