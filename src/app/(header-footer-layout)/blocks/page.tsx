'use client';
import Link from 'next/link';
import { useState } from 'react';

import { useQuery } from 'react-query';

import TableSkeleton from 'src/components/internal/table-skeleton/table-skeleton.component';
import StatBox from 'src/components/internal/stat-box/stat-box.component';
import Pagination from 'src/components/internal/pagination/pagination.component';
import QuickPagination from 'src/components/internal/quick-pagination/quick-pagination.component';
import StatBoxSkeleton from 'src/components/skeletons/root/stat-box.skeleton';
import Tooltip from 'src/components/internal/tooltip/tooltip.component';
import ErrorComponent from 'src/components/error/error.component';

import QueryApi from 'src/shared/api/query-api';
import { BnToDec, shortenAddress, timeAgo } from 'src/shared/utils/formatters';
import { copyToClipboard } from 'src/shared/utils/functions';

import QUERY_KEYS from 'src/static/query.keys';
import ROUTES from 'src/static/router.data';

const headers = [
	{
		id: 0,
		name: 'Block',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 1,
		name: 'Age',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 2,
		name: 'Txns',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 3,
		name: 'Fee Recipient',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 4,
		name: 'Reward', // Direction
		thClass: 'xl:px-8 px-2',
	},
];

export default function Blocks() {
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
		data: blocks_data,
		isLoading: blocks_loading,
		isError: blocks_error,
	} = useQuery([QUERY_KEYS.latest_blocks, page], () => QueryApi.blocks.latests(page, count), {
		staleTime: 1000 * 60 * 5,
		cacheTime: 0,
		onSuccess: (data) => {
			setPaginationMetadata(data.metadata);
		},
	});

	function handlePageChange(page: number) {
		setPage(page);
	}

	if (blocks_error || (!blocks_loading && !blocks_data)) return <ErrorComponent />;

	return (
		<div className="container-2 mx-auto">
			<div className="space-y-12">
				{/* first container */}
				<div className="space-y-4 ">
					{/* Title */}
					<h1 className="text-4xl font-bold dark:text-white text-abrandc-dark-grey px-2 py-1">
						Blocks
					</h1>
					{/* stats */}
					<div className="grid xl:grid-cols-3 grid-cols-1 gap-4">
						{/* <StatBox
							title="NETWORK UTILIZATION (24h)"
							valueComp={() => (
								<>
									<span>{blocks_data.networkUtilizationPast24Hours}$</span>
								</>
							)}
						/> */}

						{blocks_loading ? (
							<>
								<StatBoxSkeleton />
								<StatBoxSkeleton />
							</>
						) : (
							<>
								<StatBox
									title="AVERAGE BLOCK SIZE (24h)"
									valueComp={() => (
										<span>{blocks_data.averageBlockSizePast24Hours} Bytes</span>
									)}
								/>
								<StatBox
									title={'BLOCK REWARDS (24h)'}
									valueComp={() => (
										<span>
											{BnToDec(
												blocks_data.totalBlockRewardsPast24Hours,
												9,
												9
											)}{' '}
											PWR
										</span>
									)}
								/>
							</>
						)}
					</div>
				</div>
				{/* All blocks */}
				<div className="space-y-2">
					{/* Title */}
					<div className="flex flex-col lg:flex-row lg:justify-between  lg:items-center gap-y-4">
						<div>
							<h1 className="leading-[26px] px-2 py-1 dark:text-white text-abrandc-dark-grey font-medium">
								More than {blocks_data?.metadata?.totalItems || 0} blocks found
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
					</div>

					{/* Table */}
					<div className="w-full mt-5 overflow-x-auto scroll-sm">
						{blocks_loading ? (
							<TableSkeleton />
						) : (
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
									{blocks_data.blocks.map((block, idx) => (
										<tr
											key={idx}
											className={` ${
												idx % 2 === 0
													? 'dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
													: 'bg-transparent'
											}`}
										>
											{/* Block */}
											<td className="xl:px-8 px-2 py-8">
												<Link
													href={`${ROUTES.blocks}/${block.blockHeight}`}
													className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 font-medium text-center block"
												>
													{block.blockHeight}
												</Link>
											</td>

											{/* Age */}
											<td className="xl:px-8 px-2 py-8">
												<div className="dark:text-white text-abrandc-dark-grey font-normal text-center">
													{timeAgo(block.timeStamp)}
												</div>
											</td>

											{/* txns */}
											<td className="xl:px-8 px-2 py-8">
												<div className="dark:text-white text-abrandc-dark-grey font-normal text-center">
													<Link
														href={ROUTES.blockTxns(block.blockHeight)}
														className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 font-medium"
													>
														{block.txnsCount}
													</Link>
												</div>
											</td>

											{/* fee recipient */}
											<td className="xl:px-8 px-2 py-8">
												<div className="flex gap-x-2 justify-center">
													<Link
														href={`${ROUTES.address}/${block.blockSubmitter}`}
														className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 font-medium"
													>
														{shortenAddress(block.blockSubmitter, 4)}
													</Link>

													<Tooltip
														text="Copied to clipboard"
														position="up"
														trigger="click"
													>
														<button
															className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200"
															onClick={() =>
																copyToClipboard(
																	block.blockSubmitter
																)
															}
														>
															<i className="far fa-clone" />
														</button>
													</Tooltip>
												</div>
											</td>

											{/* Reward */}
											<td className="xl:px-8 px-2 py-8">
												<div className="dark:text-white text-abrandc-dark-grey font-normal text-center">
													{BnToDec(block.blockReward, 9, 9)} PWR
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>

					<div>
						<Pagination
							metadata={paginationMetadata} // Pass updated metadata
							onPageChange={(page: number) => setPage(page)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
