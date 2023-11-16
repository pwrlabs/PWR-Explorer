export default function LatestSkeleton() {
	return (
		<div className="flex items-center gap-x-8 skeleton-container h-full w-full">
			<div className="skeleton-circle !h-[32px] w-[32px] !mb-0"></div>

			<div className="flex-grow space-y-4">
				<div className="skeleton-title max-w-[200px]"></div>
				<div className="skeleton-line max-w-[150px] !mb-0"></div>
				<span className="sr-only">Loading...</span>
			</div>

			<div className="flex-grow space-y-2">
				<div className="skeleton-title max-w-[170px]"></div>
				<div className="skeleton-line max-w-[50px] !mb-0"></div>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}
