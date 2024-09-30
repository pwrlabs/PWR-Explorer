'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from 'react-query';

import TableSkeleton from 'src/components/internal/table-skeleton/table-skeleton.component';
import QueryApi from 'src/shared/api/query-api';
import QUERY_KEYS from 'src/static/query.keys';

import Tooltip from 'src/components/internal/tooltip/tooltip.component';
import StatBox from 'src/components/internal/stat-box/stat-box.component';
import Pagination from 'src/components/internal/pagination/pagination.component';
import QuickPagination from 'src/components/internal/quick-pagination/quick-pagination.component';
import TransactionTooltipDetails from 'src/components/internal/transaction-tooltip-details/transaction-tooltip-details';
import StatBoxSkeleton from 'src/components/skeletons/root/stat-box.skeleton';
import ErrorComponent from 'src/components/error/error.component';

import { BnToDec, shortenAddress, timeAgo } from 'src/shared/utils/formatters';

import ROUTES from 'src/static/router.data';
import { copyToClipboard, isAddress } from 'src/shared/utils/functions';

import './transactions.scss';

const headers = [
	{
		id: 0,
		name: 'Txn Hash',
		thClass: 'xl:px-8 px-2 ',
		containerClass: 'justify-start pl-8',
	},
	{
		id: 1,
		name: 'Block',
		thClass: 'xl:px-8 px-2',
		containerClass: 'justify-center',
	},
	{
		id: 2,
		name: 'Timestamp',
		thClass: 'xl:px-8 px-2',
		containerClass: 'justify-center',
	},
	{
		id: 3,
		name: 'From',
		thClass: 'xl:pl-8 pl-2 pr-2',
		containerClass: 'justify-center',
	},
	{
		id: 4,
		name: '', // Direction
		thClass: ' px-2',
		containerClass: 'justify-center',
	},
	{
		id: 5,
		name: 'To',
		thClass: 'xl:pr-8 pr-2 pl-2',
		containerClass: 'justify-center',
	},
	{
		id: 6,
		name: 'Value',
		thClass: 'xl:px-8 px-2',
		containerClass: 'justify-center',
	},
];

export default function Transactions() {
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
		data: txnsData,
		isLoading: txnsLoading,
		isError: txnsError,
	} = useQuery(
		[QUERY_KEYS.latest_txns, page, count],
		() => QueryApi.transactions.latest(page, count),
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

	if (txnsError || (!txnsLoading && !txnsData)) return <ErrorComponent />;

	return (
		<main className="container-2 mx-auto xl:space-y-20 space-y-5">
			<section className="space-y-4">
				{/* Title */}
				<h1 className="text-4xl font-bold dark:text-white text-abrandc-dark-grey px-2 py-1">
					Transactions
				</h1>

				{/* stats */}
				<div className="grid xl:grid-cols-3 grid-cols1 gap-4">
					{/* Transactions */}
					{txnsLoading ? (
						<>
							<StatBoxSkeleton />
							<StatBoxSkeleton />
							<StatBoxSkeleton />
						</>
					) : (
						<>
							<StatBox
								title="TRANSACTIONS (24h)"
								valueComp={() => (
									<>
										<span>{txnsData.transactionCountPast24Hours}</span>
									</>
								)}
								icon="/icons/arrows.svg"
							/>
							<StatBox
								title="TRANSACTION FEE (24h)"
								valueComp={() => (
									<span>
										{BnToDec(txnsData.totalTransactionFeesPast24Hours, 9, 9)}{' '}
										PWR
									</span>
								)}
								icon="/icons/pwr.svg"
							/>

							<StatBox
								title="AVG. TRANSACTION FEE (24h)"
								valueComp={() => (
									<span>
										{BnToDec(txnsData.averageTransactionFeePast24Hours, 9, 9)}{' '}
										PWR
									</span>
								)}
								icon="/icons/arrows.svg"
							/>
						</>
					)}
				</div>
			</section>

			{/* Table */}
			<section>
				{/* Title */}
				<div className="flex flex-col lg:flex-row lg:justify-between  lg:items-center gap-y-4">
					{txnsLoading ? (
						<div className="skeleton-container space-y-4">
							<div className="skeleton-title w-[300px]"></div>
							<div className="skeleton-line w-[200px]"></div>
						</div>
					) : (
						<div>
							<h1 className="leading-[26px] px-2 py-1 dark:text-white text-abrandc-dark-grey font-medium">
								More than {txnsData.metadata.totalItems} transactions found
							</h1>
							<h2 className="text-xs px-2 py-1 dark:text-white text-abrandc-dark-grey font-medium">
								(Showing the latest records)
							</h2>
						</div>
					)}

					<div className="flex items-center justify-center gap-x-2 text-white">
						<QuickPagination
							metadata={paginationMetadata}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>

				{/* Table */}
				<div className="w-full mt-5 overflow-x-auto scroll-sm">
					{txnsLoading ? (
						<TableSkeleton />
					) : (
						<table className="table-auto bg-awhite w-full min-w-[900px] ">
							{/* table header */}
							<thead className="sticky top-0 ">
								<tr>
									{headers.map((header, idx) => (
										<th
											className={`dark:text-white text-abrandc-dark-grey ${header.thClass} py-1`}
											key={idx}
										>
											{header.name.length > 0 && (
												<div
													className={`flex  items-center gap-x-2 ${header.containerClass}`}
												>
													<h1 className="text-abrandc-dark-grey dark:text-white text-sm font-bold">
														{header.name}
													</h1>
													{/* <div className="text-agrey-500 dark:text-agrey-600">
													<i className="fa-sm far fa-info-circle" />
												</div> */}
												</div>
											)}
										</th>
									))}
								</tr>
							</thead>

							{/* table body */}
							<tbody>
								{txnsData.transactions.map((txn, idx) => (
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
												<div className="eye_tooltip_container">
													<Image
														className="w-auto h-auto"
														src="/icons/eye.svg"
														width={20}
														height={20}
														alt=""
													/>

													<div className="tooltip">
														<TransactionTooltipDetails
															// usdFee={txn.txnFeeInUsd}
															fee={txn.txnFee}
															nonce={txn.nonceOrValidationHash}
														/>
													</div>
												</div>

												<Link
													href={`${ROUTES.transactions}/${txn.txnHash}`}
													className="font-medium dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200"
												>
													{shortenAddress(txn.txnHash)}
												</Link>
											</div>
										</td>

										{/* block */}
										<td className="xl:px-8 px-2 py-8">
											<Link
												href={`${ROUTES.blocks}/${txn.block}`}
												className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 font-medium text-center block"
											>
												{txn.block}
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
													href={`${ROUTES.address}/${txn.from}`}
													className="font-medium dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200"
												>
													{shortenAddress(txn.from, 4)}
												</Link>

												<Tooltip
													text="Copied to clipbloard"
													position="up"
													trigger="click"
												>
													<button
														className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200"
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
												{isAddress(txn.to) ? (
													<Link
														href="/"
														className="font-medium dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200"
													>
														{shortenAddress(txn.to, 4)}
													</Link>
												) : (
													<span className="dark:text-ablue-100 text-ablue-500 font-medium">
														{txn.to}
													</span>
												)}

												<Tooltip
													text="Copied to clipbloard"
													position="up"
													trigger="click"
												>
													<button
														className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200"
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
												{BnToDec(txn.value, 9, 9)} PWR
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>

				<div>
					<Pagination metadata={paginationMetadata} onPageChange={handlePageChange} />
				</div>
			</section>
		</main>
	);
}
