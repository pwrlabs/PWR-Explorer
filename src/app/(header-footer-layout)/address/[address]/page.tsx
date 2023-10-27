'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from 'react-query';
import QueryApi from '@/shared/api/query-api';
import QUERY_KEYS from '@/static/query.keys';

import Tooltip from '@/components/internal/tooltip/tooltip.component';

import StatBox from '@/components/internal/stat-box/stat-box.component';
import { BnToDec, numberWithCommas, shortenAddress, timeAgo } from '@/shared/utils/formatters';

import ROUTES from '@/static/router.data';
import Pagination from '@/components/internal/pagination/pagination.component';
import { useState } from 'react';
import { copyToClipboard } from '@/shared/utils/functions';
import QuickPagination from '@/components/internal/quick-pagination/quick-pagination.component';

const headers = [
	{
		id: 0,
		name: 'Txn Hash',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 1,
		name: 'Status',
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

type AddressPageProps = {
	params: {
		address: string;
	};
};

export default function AddressPage({ params }: AddressPageProps) {
	const address = params.address;

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

	const [page, setPage] = useState<number>(10);
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

	// txnHistory

	const {
		data: txnHistoryData,
		isLoading: txnHistoryLoading,
		isError: txnHistoryError,
	} = useQuery(
		[QUERY_KEYS.txn_history, address, page, count],
		() => QueryApi.user.txnHistory(address, page, count),
		{
			staleTime: 1000 * 60 * 5,
			cacheTime: 0,
			onSuccess: (data) => {
				if (data.status === 'failure') return;

				setPaginationMetadata(data.data.metadata);
			},
		}
	);

	function handlePageChange(page: number) {
		setPage(page);
	}

	if (txnHistoryLoading || balanceLoading) return null;

	if (
		txnHistoryError ||
		!txnHistoryData ||
		txnHistoryData.status === 'failure' ||
		balanceError ||
		!balanceData ||
		balanceData.status === 'failure'
	)
		return <div>Error</div>;

	return (
		<main className="container-2 mx-auto">
			<section className="space-y-4">
				{/* Title */}
				<h1 className="text-4xl font-bold dark:text-white text-abrandc-dark-grey">
					Account
				</h1>

				<div className="flex items-center space-x-4 ">
					<h1>
						<span className="dark:text-white text-abrandc-dark-grey mr-2">Address</span>
						<span className="dark:text-ablue-100 text-ablue-500">{address}</span>
					</h1>

					<Tooltip text="Copied to clipbloard" position="up" trigger="click">
						<button className="text-agrey-500 dark:text-agrey-600">
							<i className="far fa-clone" />
						</button>
					</Tooltip>
				</div>

				{/* Overview */}
				<div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
					{/* Overview box */}
					<div className="  bg-abrandc-light-grey dark:bg-agrey-900 rounded-xl p-4 w-full space-y-4">
						<h1 className="text-xl font-bold dark:text-white text-abrandc-dark-grey">
							Overview
						</h1>

						{/* First Transaction Info */}
						<div className="space-y-1">
							<div className="text-agrey-500 dark:text-agrey-600 text-sm font-medium">
								PWR BALANCE
							</div>
							<div className="space-x-2">
								<span className="dark:text-white text-black font-bold">
									{numberWithCommas(+BnToDec(balanceData.data.balance, 9, 9))} PWR
								</span>
								<span className="text-agrey-500 dark:text-agrey-600">
									<Tooltip text="lorem" position="up" trigger="hover">
										<i className="far fa-info-circle" />
									</Tooltip>
								</span>
							</div>
						</div>

						{/* Pwr value */}
						<div className="space-y-1">
							<span className="text-agrey-500 dark:text-agrey-600 text-sm font-medium">
								PWR VALUE
							</span>
							<div className="space-x-2">
								<span className="dark:text-white text-black font-bold">
									${numberWithCommas(balanceData.data.balanceUsdValue)}
								</span>
								<span className="text-agrey-500 dark:text-agrey-600">
									(@ $1.00/PWR)
								</span>
							</div>
						</div>
					</div>

					{/* Overview box */}
					<div className="  bg-abrandc-light-grey dark:bg-agrey-900 rounded-xl p-4 w-full space-y-4">
						<h1 className="text-xl font-bold dark:text-white text-abrandc-dark-grey">
							More Info
						</h1>

						{/* Last Transaction Info */}
						<div className="space-y-1">
							<div className="text-agrey-500 dark:text-agrey-600 text-sm font-medium">
								LAST TXN SENT
							</div>
							<div className="flex gap-x-2">
								<Link
									href={`${ROUTES.transactions}/0x71E5eE...4C1681`}
									className="text-medium text-ablue-800 dark:text-ablue-100"
								>
									0x71E5eE...4C1681
								</Link>

								<Tooltip position="up" trigger="click" text="copied to clipboard">
									<button className="text-agrey-500 dark:text-agrey-600">
										<i className="far fa-clone "></i>
									</button>
								</Tooltip>

								<div className="text-agrey-500 dark:text-agrey-600 text-sm font-medium">
									8h 33m ago
								</div>
							</div>
						</div>

						{/* Last txn info */}
						<div className="space-y-1">
							<span className="text-agrey-500 dark:text-agrey-600 text-sm font-medium">
								FIRST TXN SENT
							</span>
							<div className="flex gap-x-2">
								<Link
									href={`${ROUTES.transactions}/0x71E5eE...4C1681`}
									className="text-medium text-ablue-800 dark:text-ablue-100"
								>
									0x71E5eE...4C1681
								</Link>

								<Tooltip position="up" trigger="click" text="copied to clipboard">
									<button className="text-agrey-500 dark:text-agrey-600">
										<i className="far fa-clone "></i>
									</button>
								</Tooltip>

								<div className="text-agrey-500 dark:text-agrey-600 text-sm font-medium">
									8h 33m ago
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Table */}
			<section className="overflow-x-auto mt-12">
				<div className="flex justify-between items-center">
					<div className="dark:text-white text-abrandc-dark-grey font-medium">
						<h1 className="leading-[26px] px-2 py-1">Total 213 transactions found</h1>
						<h2 className="text-xs px-2 py-1">(Showing the last 15 records)</h2>
					</div>
					<div className="flex items-center gap-x-2 text-white">
						<h3 className="">First</h3>
						<h3 className="">Last</h3>
					</div>
				</div>
				{/* Table */}
				<div className="w-full mt-5 overflow-x-auto">
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
							{txnHistoryLoading ? (
								<tr>
									<td>Loading</td>
								</tr>
							) : (
								txnHistoryData.data.transactions.map((txn, idx) => (
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

										{/* status */}
										<td className="px-2 py-8">
											<Link
												href={`${ROUTES.blocks}/${txn.blockNumber}`}
												className="dark:text-ablue-300 text-ablue-200 font-medium text-center block"
											>
												{txn.txnType}
											</Link>
										</td>

										{/* block */}
										<td className="xl:px-8 px-2 py-8">
											<Link
												href={`${ROUTES.blocks}/${txn.blockNumber}`}
												className="dark:text-ablue-300 text-ablue-200 font-medium text-center block"
											>
												17214042{txn.blockNumber}
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
										<td className="xl:pl-8 pl-2 pr-2 py-8">
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
			</section>
		</main>
	);
}
