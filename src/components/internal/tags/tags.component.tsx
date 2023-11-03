'use client';

import './tags.scss';

// const { tags, light, grey, active } = styles;

type Props = {
	className?: string;
	children: React.ReactNode;
	disabled?: boolean;
};

export default function Tags({ className, children }: Props) {
	return <div className={`tags ${className} `}>{children}</div>;
}
