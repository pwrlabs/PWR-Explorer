import {
	arrow,
	offset,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	type Placement,
} from '@floating-ui/react';

import './tooltip.scss';

import { FloatingArrow } from '@floating-ui/react';
import React, { useRef, useState } from 'react';

type ClickTooltipProps = {
	Component: any;
	children: React.ReactNode;
	placement?: Placement;
	className?: string;
	large?: boolean;
};

export default function ClickTooltip({
	Component,
	children,
	placement = 'top',
	className = '',
	large = false,
}: ClickTooltipProps) {
	const arrowRef = useRef(null);
	const [showTooltip, setShowTooltip] = useState(false);

	const { refs, floatingStyles, context } = useFloating({
		placement,
		open: showTooltip,
		onOpenChange: setShowTooltip,
		middleware: [offset(10), arrow({ element: arrowRef })],
	});

	const click = useClick(context);

	const dismiss = useDismiss(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

	return (
		<div className="relative inline-block">
			<div
				className="tooltip-container-wrapper"
				{...getReferenceProps()}
				ref={refs.setReference}
			>
				{children}
			</div>
			{showTooltip && (
				<div
					className={`tooltip ${className} ${large ? 'w-[300px] !text-left' : 'w-max'}`}
					ref={refs.setFloating}
					{...getFloatingProps()}
					style={floatingStyles}
				>
					<FloatingArrow
						ref={arrowRef}
						context={context}
						className="fill-ghostlyGray-100     dark:fill-gray-900"
					/>
					<Component />
				</div>
			)}
		</div>
	);
}
