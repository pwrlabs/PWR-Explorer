'use client';

import React, { useEffect, useRef } from 'react';
import Link, { LinkProps as InternalLinkProps } from 'next/link';
import './button.scss';

type CustomLinkProps = {
	href?: string; // Make href optional by adding "?"
} & Omit<InternalLinkProps, 'href'>;

type Props = {
	children: React.ReactNode;
	className: string;
	tag_type?: 'def' | 'a' | 'link';
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
	React.AnchorHTMLAttributes<HTMLAnchorElement> &
	CustomLinkProps;

export default function Button({ children, className, tag_type = 'def', href, ...rest }: Props) {
	const buttonRef = useRef<any>(null);

	const rippleEffect = (e: any) => {
		const btn = e.currentTarget;

		const circle = document.createElement('span');
		const rect = btn.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = e.clientX - rect.left - size / 2;
		const y = e.clientY - rect.top - size / 2;

		circle.style.width = circle.style.height = `${size}px`;
		circle.style.left = `${x}px`;
		circle.style.top = `${y}px`;
		circle.classList.add('click_overlay');

		btn.appendChild(circle);

		circle.addEventListener('animationend', () => {
			btn.removeChild(circle);
		});
	};

	// add click event lisnter
	useEffect(() => {
		if (!buttonRef.current) return;

		const btn = buttonRef.current;

		btn.addEventListener('click', rippleEffect);

		return () => {
			btn.removeEventListener('click', rippleEffect);
		};
	}, [buttonRef]);

	if (tag_type === 'a')
		return (
			<a
				className={`comp_button ${className}`}
				{...rest}
				ref={buttonRef as React.Ref<HTMLAnchorElement>}
			>
				{children}
			</a>
		);

	if (tag_type === 'link')
		return (
			<Link
				href={href || '/'}
				className={`comp_button ${className}`}
				{...rest}
				ref={buttonRef as React.Ref<HTMLAnchorElement>}
			>
				{children}
			</Link>
		);

	return (
		<button
			className={`comp_button ${className}`}
			{...rest}
			ref={buttonRef as React.Ref<HTMLButtonElement>}
		>
			{children}
		</button>
	);
}
