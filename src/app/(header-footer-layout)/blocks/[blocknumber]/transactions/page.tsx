'use client';

import Pagination from '@/components/internal/pagination/pagination.component';
import QuickPagination from '@/components/internal/quick-pagination/quick-pagination.component';
import Tooltip from '@/components/internal/tooltip/tooltip.component';
import QueryApi from '@/shared/api/query-api';
import { BnToDec, shortenAddress, timeAgo } from '@/shared/utils/formatters';
import { copyToClipboard } from '@/shared/utils/functions';
import QUERY_KEYS from '@/static/query.keys';
import ROUTES from '@/static/router.data';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';

type BlockTransactionsProps = {
	params: {
		blocknumber: number;
	};
};

const headers = [
	{
		id: 0,
		name: 'Txn Hash',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 1,
		name: 'Block',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 2,
		name: 'Timestamp',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 3,
		name: 'From',
		thClass: 'xl:pl-8 pl-2 pr-2',
	},
	{
		id: 4,
		name: '', // Direction
		thClass: ' px-2',
	},
	{
		id: 5,
		name: 'To',
		thClass: 'xl:pr-8 pr-2 pl-2',
	},
	{
		id: 6,
		name: 'Value',
		thClass: 'xl:px-8 px-2',
	},
];

export default function BlockTransactions({ params }: BlockTransactionsProps) {
	const blockNum = params.blocknumber;

	const [page, setPage] = useState<number>(1);
	const [count, setCount] = useState<number>(10);

	const [paginationMetadata, setPaginationMetadata] = useState({
		currentPage: 1,
		totalPages: 1,
		startIndex: 0,
		endIndex: 0,
		totalItems: 0,
		itemsPerPage: 0,
		nextPage: 0,
		previousPage: 0,
	});

	const {
		data: blocktxns_data,
		isLoading: blocktxns_loading,
		isError: blocktxns_error,
	} = useQuery(
		[QUERY_KEYS.block_txns, blockNum],
		() => QueryApi.blocks.allTxn(blockNum, page, count),
		{
			staleTime: 1000 * 60 * 5,
			cacheTime: 0,
			onSuccess: (data) => {
				setPaginationMetadata(data.metadata);
			},
		}
	);

	function handlePageChange(page: number) {
		setPage(page);
	}

	console.log(blocktxns_data);

	if (blocktxns_loading || !blocktxns_data) return null;

	if (blocktxns_error) return <div>error</div>;

	return (
		<div className="container-2 mx-auto text-white">
			{/* Title */}
			<div className="flex items-center gap-x-2">
				<h1 className="py-1 text-4xl font-bold dark:text-white text-abrandc-dark-grey">
					Block Transactions
				</h1>
				<h1 className="text-ablue-100 lg:hidden">{blockNum}</h1>
			</div>

			<br />

			{/* Transaction details */}
			<div className="flex flex-col lg:flex-row lg:justify-between  lg:items-center">
				<div>
					<h2 className="dark:text-white text-abrandc-dark-grey font-medium">
						<span className="mr-4">For Block</span>
						<span className="text-ablue-800 dark:text-ablue-100 ">{blockNum}</span>
					</h2>
					<h3 className="dark:text-white text-abrandc-dark-grey text-xs font-medium">
						(A total of {blocktxns_data.transactions.length} transactions found)
					</h3>
				</div>

				<div className="flex items-center justify-center gap-x-2 text-white">
					<QuickPagination
						metadata={paginationMetadata}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>

			{/* Table */}
			<div className="w-full mt-5 overflow-x-auto scroll-sm">
				<table className="table-auto bg-awhite w-full min-w-[900px]">
					{/* table header */}
					<thead className="sticky top-0">
						<tr>
							{headers.map((header, idx) => (
								<th
									className={`dark:text-white text-abrandc-dark-grey ${header.thClass} py-1`}
									key={idx}
								>
									{header.name.length > 0 && (
										<div className="flex justify-center items-center gap-x-2">
											<div className="text-abrandc-dark-grey dark:text-white text-sm font-bold">
												{header.name}
											</div>
											<div className="text-agrey-500 dark:text-agrey-600">
												{/* info icon */}
												<i className="fa-sm far fa-info-circle" />
											</div>
										</div>
									)}
								</th>
							))}
						</tr>
					</thead>

					{/* table body */}
					<tbody>
						{blocktxns_loading ? (
							<tr>
								<td>Loading</td>
							</tr>
						) : (
							blocktxns_data.transactions.map((txn, idx) => (
								<tr
									key={txn.txnHash}
									className={` ${
										idx % 2 == 0
											? ' dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
											: 'bg-transparent'
									}`}
								>
									{/* txn hash */}
									<td className="xl:px-8 px-2 py-8">
										<div className="flex gap-x-2 justify-start">
											<div>
												<Image
													className="w-auto h-auto"
													src="/icons/eye.svg"
													width={20}
													height={20}
													alt=""
												/>
											</div>

											<Link
												href={`${ROUTES.transactions}/${txn.txnHash}`}
												className="dark:text-ablue-300 text-ablue-200 font-medium"
											>
												{shortenAddress(txn.txnHash)}
											</Link>
										</div>
									</td>

									{/* block */}
									<td className="xl:px-8 px-2 py-8">
										<Link
											href={`${ROUTES.blocks}/${txn.blockNumber}`}
											className="dark:text-ablue-300 text-ablue-200 font-medium text-center block"
										>
											{txn.blockNumber}
										</Link>
									</td>

									{/* time ago */}
									<td className="xl:px-8 px-2 py-8">
										<div className="dark:text-white text-abrandc-dark-grey font-normal text-center">
											{timeAgo(txn.timeStamp)}
										</div>
									</td>

									{/* from */}
									<td className="xl:pl-8 pl-2 pr-2 py-8">
										<div className="flex gap-x-2 justify-center">
											<Link
												href="/"
												className="dark:text-ablue-100 text-ablue-500 font-medium"
											>
												{shortenAddress(txn.from, 4)}
											</Link>

											<Tooltip
												text="Copied to clipbloard"
												position="up"
												trigger="click"
											>
												<button
													className="text-agrey-500 dark:text-agrey-600"
													onClick={() => copyToClipboard(txn.from)}
												>
													<i className="far fa-clone" />
												</button>
											</Tooltip>
										</div>
									</td>

									{/* direction */}
									<td className="px-2 py-8 flex justify-center">
										<div className="w-6 h-6 bg-violet-100 dark:bg-agrey-800 rounded-full grid place-items-center">
											<div className="text-agrey-500 dark:text-agrey-600">
												<i className="fas fa-arrow-right fa-sm" />
											</div>
										</div>
									</td>

									{/* To */}
									<td className="xl:pr-8 pr-2 pl-2 py-8">
										<div className="flex gap-x-2 justify-center">
											<Link
												href="/"
												className="dark:text-ablue-100 text-ablue-500 font-medium"
											>
												{shortenAddress(txn.to, 4)}
											</Link>

											<Tooltip
												text="Copied to clipbloard"
												position="up"
												trigger="click"
											>
												<button
													className="text-agrey-500 dark:text-agrey-600"
													onClick={() => copyToClipboard(txn.to)}
												>
													<i className="far fa-clone" />
												</button>
											</Tooltip>
										</div>
									</td>

									{/* value */}
									<td className="xl:px-8 px-2 py-8">
										<div className="dark:text-white text-abrandc-dark-grey font-normal text-center">
											{BnToDec(txn.value, 9)} PWR
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			<div>
				<Pagination metadata={paginationMetadata} onPageChange={handlePageChange} />
			</div>
		</div>
	);
}