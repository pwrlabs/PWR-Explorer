'use client';

import Tooltip from '@/components/internal/tooltip/tooltip.component';
import { useFloating } from '@floating-ui/react';

export default function TestPage() {
	const { refs, floatingStyles } = useFloating();
	return (
		<>
			<div ref={refs.setReference} />
			<div ref={refs.setFloating} style={floatingStyles} />
		</>
	);
}
