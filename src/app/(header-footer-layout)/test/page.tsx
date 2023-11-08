import React from 'react';

interface Header {
	name: string;
	thClass: string;
}

interface SkeletonTableProps {
	headers: Header[];
	txnsLoading: boolean;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ headers, txnsLoading }) => {
	const sampleTransaction = {
		txnHash: 'sampleTxnHash123',
	};

	return (
		<section>
			{/* Title */}
			{/* Table */}
			<div className="w-full mt-5 overflow-x-auto scroll-sm">
				<table className="table-auto bg-awhite w-full min-w-[80vw]">
					{/* table header */}
					

					{/* table body - Skeleton Rows */}
					<tbody>
						{txnsLoading ? (
							Array.from({ length: 10 }, (_, idx) => (
								<tr
									key={idx}
									className={` ${
										idx % 2 == 0
											? 'dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
											: 'bg-transparent'
									}`}
								>
									<td className="xl:px-8 px-2 py-10" colSpan={headers.length}>
										{/* Increase the py value */}
										<div className="skeleton-title w-full w-[80vw]"></div>
									</td>
									{/* ... (Other <td> elements) */}
								</tr>
							))
						) : (
							<tr key={sampleTransaction.txnHash}>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div>
				{/* Replace with your pagination component */}
				<div className="skeleton-pagination" />
			</div>
		</section>
	);
};

export default SkeletonTable;
