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

import './nodes.scss';

const headers = [
	{
		id: 0,
		name: 'Node ID',
		thClass: 'xl:px-8 px-2 ',
		containerClass: 'justify-start pl-8',
	},
	{
		id: 1,
		name: 'Host',
		thClass: 'xl:px-8 px-2',
		containerClass: 'justify-center',
	},
	{
		id: 2,
		name: 'Total Voting Power',
		thClass: 'xl:px-8 px-2',
		containerClass: 'justify-center',
	},
	{
		id: 3,
		name: 'Earnings (PWR)',
		thClass: 'xl:px-8 px-2',
		containerClass: 'justify-center',
	},
	{
		id: 4,
		name: 'Blocks Submitted',
		thClass: ' px-2',
		containerClass: 'justify-center',
	},
];

export default function Nodes() {
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
		data: nodesData,
		isLoading: nodesLoading,
		isError: nodesError,
	} = useQuery(
		[QUERY_KEYS.nodes_info, page, count],
		() => QueryApi.nodes.nodesInfo(page, count),
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

	if (nodesError || (!nodesLoading && !nodesData)) return <ErrorComponent />;

	return (
		<main className="container-2 mx-auto space-y-20">
			<section className="space-y-4">
				{/* Title */}
				<h1 className="text-4xl font-bold dark:text-white text-abrandc-dark-grey px-2 py-1">
					Nodes Tracker
				</h1>

				{/* stats */}
				<div className="grid xl:grid-cols-3 grid-cols1 gap-4">
					{/* Transactions */}
					{nodesLoading ? (
						<>
							<StatBoxSkeleton />
							<StatBoxSkeleton />
							<StatBoxSkeleton />
						</>
					) : (
						<>
							<StatBox
								title="TOTAL ACTIVE NODES"
								valueComp={() => (
									<>
										<span>{nodesData.totalActiveNodes}</span>
									</>
								)}
								icon="/icons/check.svg"
								tooltipText="Total number of active nodes on the network"
							/>
							<StatBox
								title="TOTAL STANDBY NODES"
								valueComp={() => <span>{nodesData.totalStandbyNodes}</span>}
								icon="/icons/nodes.svg"
								tooltipText="Total number of standby nodes on the network"
							/>

							<StatBox
								title="TOTAL VOTING POWER"
								valueComp={() => (
									<span>
										{BnToDec(nodesData.totalVotingPower.toString(), 9, 0)} PWR
									</span>
								)}
								icon="/icons/pwr.svg"
								tooltipText="Total voting power of all nodes on the network"
							/>
						</>
					)}
				</div>
			</section>

			{/* Table */}
			<section>
				{/* Title */}
				<div className="flex flex-col lg:flex-row lg:justify-between  lg:items-center gap-y-4">
					{nodesLoading ? (
						<div className="skeleton-container space-y-4">
							<div className="skeleton-title w-[300px]"></div>
							<div className="skeleton-line w-[200px]"></div>
						</div>
					) : (
						<div>
							<h1 className="leading-[26px] px-2 py-1 dark:text-white text-abrandc-dark-grey font-medium">
								More than {nodesData.metadata.totalItems} Nodes found
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
					{nodesLoading ? (
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
								{nodesData.nodes.map((node, idx) => (
									<tr
										key={node.address}
										className={` ${
											idx % 2 == 0
												? ' dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
												: 'bg-transparent'
										}`}
									>
										{/* txn hash */}
										<td className="xl:px-8 px-2 py-8">
											<div className="flex gap-x-2 justify-start">
												<h1
													// href={`${ROUTES.transactions}/${node.address}`}
													className="dark:text-ablue-100 text-ablue-500 font-medium"
												>
													{shortenAddress(node.address)}
												</h1>
												<Tooltip
													text="Copied to clipbloard"
													position="up"
													trigger="click"
												>
													<button
														className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200"
														onClick={() =>
															copyToClipboard(node.address)
														}
													>
														<i className="far fa-clone" />
													</button>
												</Tooltip>
											</div>
										</td>

										{/* block */}
										<td className="xl:px-8 px-2 py-8">
											<Link
												href={`${ROUTES.blocks}/${node.host}`}
												className="dark:text-white  text-abrandc-dark-grey font-medium text-center block"
											>
												{node.host}
											</Link>
										</td>

										{/* time ago */}
										<td className="xl:px-8 px-2 py-8">
											<div className="flex justify-center items-center">
												<h1 className="dark:bg-agrey-800 bg-ghostly_grey-50 rounded-lg dark:text-white  text-abrandc-dark-grey text-sm py-1 px-2 text-center w-auto">
													{node.votingPowerInPwr} /{' '}
													{node.votingPowerInPercentage}%
												</h1>
											</div>
										</td>

										{/* from */}
										<td className="xl:px-8 px-2 py-8">
											<div className="flex justify-center items-center">
												<h1 className="dark:bg-agrey-800 bg-ghostly_grey-50 rounded-lg dark:text-white  text-abrandc-dark-grey text-sm py-1 px-2 text-center w-auto">
													{node.earnings}
												</h1>
											</div>
										</td>

										{/* direction */}
										<td className="px-2 py-8 flex justify-center">
											<div className="dark:text-white  text-abrandc-dark-grey">
												{node.blocksSubmitted}
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
