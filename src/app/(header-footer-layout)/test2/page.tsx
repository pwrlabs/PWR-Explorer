'use client';

import Tooltip from '@/components/internal/tooltip/tooltip.component';

export default function TestPage() {
	return (
		<div className="lg:flex space-y-2">
			<div className="flex items-center gap-x-2 w-[300px]">
				<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">Transaction Hash</h1>
				<Tooltip text="text" large position="right">
					<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
				</Tooltip>
			</div>
			<div className="flex gap-x-2">
				<h2 className="text-sm break-all">asdasdasdasdasdasdasdasdasd</h2>
				<Tooltip text="text" position="up" trigger="click">
					<button>
						<i className="far fa-clone text-agrey-500 dark:text-agrey-600" />
					</button>
				</Tooltip>
			</div>
		</div>
	);
}
