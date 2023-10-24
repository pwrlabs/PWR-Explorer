'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from 'react-query';
import QueryApi from '@/shared/api/query-api';
import { useState } from 'react';

import StatBox from '@/components/internal/stat-box/stat-box.component';
import QUERY_KEYS from '@/static/query.keys';
import { BnToDec, shortenAddress, timeAgo } from '@/shared/utils/formatters';
import Tooltip from '@/components/internal/tooltip/tooltip.component';
import { copyToClipboard } from '@/shared/utils/functions';
import ROUTES from '@/static/router.data';
import Pagination from '@/components/internal/pagination/pagination.component';

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
	{
		id: 5,
		name: 'Shared Rewards',
		thClass: 'xl:px-8 px-2',
	},
];

export default function Blocks() {
	const [latestBlocks, setLatestBlocks] = useState([]);

	const {
		data: blocks_data,
		isLoading: blocks_loading,
		isError: blocks_error,
	} = useQuery([QUERY_KEYS.latest_blocks], () => QueryApi.blocks.latests(10));

	// const info = [
	// 	{
	// 		label: 'NETWORK UTILIZATION (24h)',
	// 		value: `${blocksQuery.data?.data.data.networkUtilizationPast24Hours}%`,
	// 	},
	// 	{
	// 		label: 'BLOCK SIZE (24h)',
	// 		value: `${blocksQuery.data?.data.data.averageBlockSizePast24Hours} bytes`,
	// 	},
	// 	{
	// 		label: 'BLOCK REWARDS (24h)',
	// 		value: `${blocksQuery.data?.data.data.totalBlockRewardsPast24Hours}%`,
	// 	},
	// ];

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
					<div className="grid xl:grid-cols-3 grid-cols1 gap-4">
						{/* Transactions */}
						<StatBox
							title="NETWORK UTILIZATION (24h)"
							valueComp={() => (
								<>
									<span>{blocks_data?.data?.networkUtilizationPast24Hours}$</span>
								</>
							)}
						/>

						<StatBox
							title="BLOCK SIZE (24h)"
							valueComp={() => (
								<>
									<span>
										{blocks_data?.data?.averageBlockSizePast24Hours} Bytes
									</span>
								</>
							)}
						/>

						<StatBox
							title="BLOCK REWARDS (24h)"
							valueComp={() => (
								<>
									<span>
										{BnToDec(
											blocks_data?.data?.totalBlockRewardsPast24Hours,
											9,
											9
										)}{' '}
										PWR
									</span>
								</>
							)}
						/>
					</div>
				</div>
				{/* All blocks */}
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<div className="flex flex-col font-medium dark:text-white text-abrandc-dark-grey">
							<h1 className="px-2 py-1 leading-[26px]">Total of 17,242,438 blocks</h1>
							<h2 className="text-xs px-2 py-1 font-normal">
								(Showing the last 500k blocks)
							</h2>
						</div>
						<div className="flex items-center gap-x-2">
							<h2>First</h2>
							<h2>Last</h2>
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
								{blocks_loading ? (
									<tr>
										<td>Loading</td>
									</tr>
								) : (
									blocks_data?.data?.blocks.map((block, idx) => (
										<tr
											key={idx}
											className={` ${
												idx % 2 == 0
													? ' dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
													: 'bg-transparent'
											}`}
										>
											{/* Block */}
											<td className="xl:px-8 px-2 py-8">
												<Link
													href={`${ROUTES.blocks}/${block.blockHeight}`}
													className="dark:text-ablue-300 text-ablue-200 font-medium"
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
														href={`${ROUTES.blocks}/${block.blockHeight}`}
														className="dark:text-ablue-300 text-ablue-200 font-medium"
													>
														{block.txnsCount}
													</Link>
												</div>
											</td>

											{/* fee recipient */}
											<td className="xl:px-8 px-2 py-8">
												<div className="flex gap-x-2 justify-center">
													<Link
														href="/"
														className="dark:text-ablue-100 text-ablue-500 font-medium"
													>
														{shortenAddress(
															'0x0000000000000000000000000000000000000000',
															4
														)}
													</Link>

													<Tooltip
														text="Copied to clipbloard"
														position="up"
														trigger="click"
													>
														<button
															className="text-agrey-500 dark:text-agrey-600"
															onClick={() =>
																copyToClipboard(
																	'0x0000000000000000000000000000000000000000'
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
													{BnToDec(block.blockReward, 9, 5)} PWR
												</div>
											</td>

											{/* Shared Rewards */}
											<td className="xl:px-8 px-2 py-8">
												<div className="dark:text-white text-abrandc-dark-grey font-normal text-center">
													<span>
														{BnToDec(block.blockReward, 9, 5)} PWR
													</span>{' '}
													<span className="dark:text-agrey-600 text-agrey-500">
														(50%)
													</span>
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
				</div>
			</div>
		</div>
	);
}
