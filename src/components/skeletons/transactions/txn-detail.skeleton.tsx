export default function TransactionDetailSkeleton() {
	return (
		<div className=" lg:flex skeleton-container h-8 space-y-2">
			<div className="w-[300px]">
				<div className="skeleton-line w-[100px]"></div>
			</div>
			<div
				className="skeleton-line"
				style={{
					width: Math.round(Math.random() * 100) + 300 + 'px',
				}}
			></div>
		</div>
	);
}
