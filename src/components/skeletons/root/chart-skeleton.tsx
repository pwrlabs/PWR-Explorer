import React from 'react';

export default function ChartSkeleton() {
	return (
		<div className="w-[400px] h-48 bg-agrey-50 dark:bg-agrey-900 p-4 rounded-md">
			{/* Skeleton for the title */}
			<div className="skeleton-title w-[200px] h-[20px] mb-4"></div>

			{/* Skeleton for the chart area */}
			<div className="skeleton-chart w-full h-[150px] rounded-md"></div>

			{/* Accessible loading text */}
			<span className="sr-only">Loading chart...</span>
		</div>
	);
}
