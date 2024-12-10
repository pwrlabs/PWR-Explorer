'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';

import TableSkeleton from 'src/components/internal/table-skeleton/table-skeleton.component';
import Tooltip from 'src/components/internal/tooltip/tooltip.component';
import Pagination from 'src/components/internal/pagination/pagination.component';
import QuickPagination from 'src/components/internal/quick-pagination/quick-pagination.component';
import ErrorComponent from 'src/components/error/error.component';

import { BnToDec, shortenAddress, timeAgo } from 'src/shared/utils/formatters';
import { copyToClipboard, isAddress, isHash } from 'src/shared/utils/functions';
import QueryApi from 'src/shared/api/query-api';

import QUERY_KEYS from 'src/static/query.keys';
import ROUTES from 'src/static/router.data';
import TransactionTooltipDetails from 'src/components/internal/transaction-tooltip-details/transaction-tooltip-details';
import './address.scss';

const headers = [
	{
		id: 0,
		name: 'Txn Hash',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 1,
		name: 'Type',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 2,
		name: 'Block',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 3,
		name: 'Timestamp',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 4,
		name: 'From',
		thClass: 'xl:pl-8 pl-2 pr-2',
	},
	{
		id: 5,
		name: '', // Direction
		thClass: ' px-2',
	},
	{
		id: 6,
		name: 'To',
		thClass: 'xl:pr-8 pr-2 pl-2',
	},
	{
		id: 7,
		name: 'Value',
		thClass: 'xl:px-8 px-2',
	},
];

type TransactionComponentProps = {
	address: string;
	page: number;
	setPage: (page: number) => void;
	count: number;
	setCount: (count: number) => void;
};

let met: any = null;

export default function TransactionComponent({
	address,
	page,
	setPage,
	count,
	setCount,
}: TransactionComponentProps) {
	// *~~*~~*~~ account balance ~~*~~*~~* //
	const {
		data: balanceData,
		isLoading: balanceLoading,
		isError: balanceError,
	} = useQuery([QUERY_KEYS.balance, address], () => QueryApi.user.balance(address), {
		staleTime: 1000 * 60 * 5,
		cacheTime: 0,
	});

	// *~~*~~*~~ Txn history ~~*~~*~~* //

	const [paginationMetadata, setPaginationMetadata] = useState(
		met || {
			currentPage: 1,
			totalPages: 1,
			startIndex: 0,
			endIndex: 0,
			totalItems: 0,
			itemsPerPage: 0,
			nextPage: 0,
			previousPage: 0,
		}
	);

	// txnHistory

	const {
		data: txnHistoryData,
		isLoading: txnHistoryLoading,
		isError: txnHistoryError,
	} = useQuery(
		[QUERY_KEYS.txn_history, address, page, count],
		() => QueryApi.user.txnHistory(address, page, count),
		{
			cacheTime: 0,
			onSuccess: (data) => {
				setPaginationMetadata(data.metadata);
				met = data.metadata;
			},
		}
	);
	console.log('TransactionComponentProps', txnHistoryData?.metadata);

	function handlePageChange(newPage: number) {
		setPage(newPage);
	}

	if (
		balanceError ||
		(!balanceLoading && !balanceData) ||
		txnHistoryError ||
		(!txnHistoryLoading && !txnHistoryData)
	)
		return <ErrorComponent />;

	return (
		<section className="overflow-x-auto mt-12">
			{/* Title */}
			<div className="flex flex-col lg:flex-row lg:justify-between  lg:items-center gap-y-4">
				{txnHistoryLoading ? (
					<div className="skeleton-container space-y-4">
						<div className="skeleton-title w-[300px]"></div>
						<div className="skeleton-line w-[200px]"></div>
					</div>
				) : txnHistoryData.transactions.length === 0 ? null : (
					<>
						<div>
							<h1 className="leading-[26px] px-2 py-1 dark:text-white text-abrandc-dark-grey font-medium">
								More than {txnHistoryData.metadata.totalItems} transactions found
							</h1>
							<h2 className="text-xs px-2 py-1 dark:text-white text-abrandc-dark-grey font-medium">
								(Showing the latest records)
							</h2>
						</div>
						<div className="flex items-center justify-center gap-x-2 text-white">
							<QuickPagination
								metadata={paginationMetadata}
								onPageChange={handlePageChange}
							/>
						</div>
					</>
				)}
			</div>
			{/* Table */}
			<div className="w-full mt-5 overflow-x-auto scroll-sm">
				{txnHistoryLoading ? (
					<TableSkeleton />
				) : txnHistoryData.transactions.length === 0 ? (
					<div className="text-center">
						<h1 className=" text-agrey-900 dark:text-white ">No transactions found</h1>
					</div>
				) : (
					<>
						<table className="table-auto bg-awhite w-full min-w-[950px]">
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
								{txnHistoryData.transactions.map((txn, idx) => (
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
													className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 font-medium"
												>
													{shortenAddress(txn.txnHash)}
												</Link>
											</div>
										</td>

										{/* type */}
										<td className="px-2 py-8">
											<div className="dark:text-ablue-100 text-ablue-500 font-medium text-center block">
												{txn.txnType}
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
											<div className="dark:text-white text-abrandc-dark-grey font-normal text-center whitespace-nowrap">
												{timeAgo(txn.timeStamp)}
											</div>
										</td>

										{/* from */}
										<td className="xl:pl-8 pl-2 pr-2 py-8">
											<div className="flex gap-x-2 justify-center">
												<Link
													href={`${ROUTES.address}/${txn.from}`}
													className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 font-medium"
												>
													{shortenAddress(txn.from, 4)}
												</Link>

												<Tooltip
													text="Copied to clipboard"
													position="up"
													trigger="click"
												>
													<button
														className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200"
														onClick={() => copyToClipboard(txn.from)}
													>
														<i className="far fa-clone dark:text-agrey-600 text-agrey-500 dark:hover:text-ablue-300 hover:text-ablue-200" />
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
										<td className="xl:pl-8 pl-2 pr-2 py-8">
											<div className="flex gap-x-2 justify-center">
												{isAddress(txn.to) ? (
													<Link
														href={`${ROUTES.address}/${txn.to}`}
														className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 font-medium"
													>
														{shortenAddress(txn.to, 4)}
													</Link>
												) : (
													<span className="dark:text-ablue-100 text-ablue-500 font-medium">
														{txn.to}
													</span>
												)}

												<Tooltip
													text="Copied to clipboard"
													position="up"
													trigger="click"
												>
													<button
														className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200    "
														onClick={() => copyToClipboard(txn.to)}
													>
														<i className="far fa-clone" />
													</button>
												</Tooltip>
											</div>
										</td>

										{/* value */}
										<td className="xl:px-8 px-2 py-8">
											<div className="dark:text-white text-abrandc-dark-grey font-normal text-center whitespace-nowrap">
												{BnToDec(txn.value, 9)} PWR
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>

						<br />

						<div>
							<Pagination
								metadata={paginationMetadata}
								onPageChange={handlePageChange}
							/>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
