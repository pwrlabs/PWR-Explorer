import {
	arrow,
	autoUpdate,
	offset,
	useFloating,
	useHover,
	useInteractions,
	type Placement,
	type Strategy
} from '@floating-ui/react';

import './tooltip.scss';

import { FloatingArrow } from '@floating-ui/react';
import React, { useRef, useState } from 'react';

type HoverTooltipProps = {
	text: string;
	children: React.ReactNode;
	placement?: Placement;
	className?: string;
	large?: boolean;
	strategy?: Strategy;
};

export default function HoverTooltip({
	text,
	children,
	placement = 'top',
	className = '',
	large = false,
	strategy = 'absolute'
}: HoverTooltipProps) {
	const arrowRef = useRef(null);
	const [showTooltip, setShowTooltip] = useState(false);

	const { refs, floatingStyles, context } = useFloating({
		placement,
		open: showTooltip,
		onOpenChange: setShowTooltip,
		whileElementsMounted: autoUpdate,
		middleware: [offset(10), arrow({ element: arrowRef })],
		strategy
	});

	const hover = useHover(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

	return (
		<div className="relative inline-block">
			<div
				className="tooltip-container-wrapper"
				{...getReferenceProps()}
				ref={refs.setReference}>
				{children}
			</div>
			{showTooltip && (
				<div
					className={`tooltip  ${className} ${large ? 'w-[300px] !text-left' : 'w-max'}`}
					ref={refs.setFloating}
					{...getFloatingProps()}
					style={floatingStyles}>
					<FloatingArrow
						ref={arrowRef}
						context={context}
						className="fill-ghostlyGray-100     dark:fill-gray-900"
					/>
					{text}
				</div>
			)}
		</div>
	);
}
