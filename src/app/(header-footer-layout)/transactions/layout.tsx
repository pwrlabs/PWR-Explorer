import AppConfig from '@/static/app.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Txns | ${AppConfig.name} `,
};

export default function AccLayout({ children }: any) {
	return children;
}
