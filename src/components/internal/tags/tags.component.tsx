'use client';

import { useState } from 'react';

import './tags.scss';

// const { tags, light, grey, active } = styles;

type Props = {
	className?: string;
	children: React.ReactNode;
	disabled?: boolean;
};

export default function Tags({ className, children, disabled }: Props) {
	const [isActive, setActive] = useState(false);

	function toggleTag() {
		setActive(!isActive);
	}

	return (
		<button
			disabled={disabled}
			onClick={toggleTag}
			className={`tags ${className} ${isActive && 'active'}`}
		>
			{children}
		</button>
	);
}
