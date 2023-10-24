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

export default function Transactions() {
	const {
		data: txnsData,
		isLoading: txnsLoading,
		isError: txnsError,
	} = useQuery([QUERY_KEYS.latest_txns], () => QueryApi.transcations.latest(10), {
		staleTime: 1000 * 60 * 5,
	});

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
	}

	return (
		<main className="container-2 mx-auto space-y-20">
			<section className="space-y-4">
				{/* Title */}
				<h1 className="text-4xl font-bold dark:text-white text-abrandc-dark-grey px-2 py-1">
					Transactions
				</h1>

				{/* stats */}
				<div className="grid xl:grid-cols-3 grid-cols1 gap-4">
					{/* Transactions */}
					<StatBox
						title="TRANSACTIONS (24h)"
						valueComp={() => (
							<>
								<span>{txnsData?.data?.transactionCountPast24Hours}</span>
								<span
									className={`font-medium  pl-2 pr-2 ${
										txnsData?.data?.transactionCountPast24Hours > 0
											? 'dark:text-abrandc-dark-green text-abrandc-light-green'
											: 'text-abrandc-light-red dark:text-abrandc-dark-red'
									}`}
								>
									(
									{
										txnsData?.data
											?.transactionCountPercentageChangeComparedToPreviousDay
									}
									%)
								</span>
							</>
						)}
						icon="/icons/arrows.svg"
					/>

					{/* Transactions fee */}
					<StatBox
						title="TRANSACTION FEE (24h)"
						valueComp={() => (
							<>
								<span>
									{numberWithCommas(
										txnsData?.data?.totalTransactionFeesPast24Hours | 0
									)}{' '}
									PWR
								</span>
								<span
									className={`font-medium  pl-2 pr-2 ${
										txnsData?.data &&
										txnsData?.data
											?.totalTransactionFeesPercentageChangeComparedToPreviousDay >
											0
											? 'dark:text-abrandc-dark-green text-abrandc-light-green'
											: 'text-abrandc-light-red dark:text-abrandc-dark-red'
									}`}
								>
									(
									{
										txnsData?.data
											?.totalTransactionFeesPercentageChangeComparedToPreviousDay
									}
									%)
								</span>
							</>
						)}
						icon="/icons/pwr.svg"
					/>

					{/* AVG Transaction fee */}
					<StatBox
						title="AVG. TRANSACTION FEE (24h)"
						valueComp={() => (
							<>
								<span>{txnsData?.data?.averageTransactionFeePast24Hours} USD</span>
								<span
									className={`font-medium  pl-2 pr-2 ${
										txnsData?.data &&
										txnsData?.data
											?.totalTransactionFeesPercentageChangeComparedToPreviousDay >
											0
											? 'dark:text-abrandc-dark-green text-abrandc-light-green'
											: 'text-abrandc-light-red dark:text-abrandc-dark-red'
									}`}
								>
									(
									{
										txnsData?.data
											?.averageTransactionFeePercentageChangeComparedToPreviousDay
									}
									%)
								</span>
							</>
						)}
						icon="/icons/arrows.svg"
					/>
				</div>
			</section>

			{/* Table */}
			<section>
				{/* Title */}
				<div className="flex justify-between items-center">
					<div>
						<h1 className="leading-[26px] px-2 py-1 dark:text-white text-abrandc-dark-grey font-medium">
							More than {txnsData?.data?.transactionCountPast24Hours} transactions
							found
						</h1>
						<h2 className="text-xs px-2 py-1 dark:text-white text-abrandc-dark-grey font-medium">
							(Showing the last 500k records)
						</h2>
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
							{txnsLoading ? (
								<tr>
									<td>Loading</td>
								</tr>
							) : (
								txnsData?.data?.txns.map((txn, idx) => (
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
					<Pagination
						metadata={{
							currentPage: 1,
							totalPages: 10,
							totalItems: 100,
							startIndex: 0,
							endIndex: 9,
							itemsPerPage: 10,
							nextPage: 2,
							previousPage: null,
						}}
						onPageChange={(page: number) => {}}
					/>
				</div>
			</section>
		</main>
	);
}
