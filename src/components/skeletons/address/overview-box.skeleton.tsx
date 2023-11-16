export default function OverviewBoxSkeleton() {
	return (
		<div className="bg-abrandc-light-grey dark:bg-agrey-900 w-full min-h-[192px] rounded-xl p-4">
			<div className="skeleton-container h-full flex flex-col justify-between">
				<div className="skeleton-title max-w-[150px]"></div>

				<div className="space-y-2">
					<div className="skeleton-line max-w-[250px]"></div>
					<div className="skeleton-line max-w-[150px]"></div>
				</div>

				<div className="space-y-2">
					<div className="skeleton-line max-w-[200px]"></div>
					<div className="skeleton-line max-w-[180px]"></div>
				</div>
			</div>
		</div>
	);
}
