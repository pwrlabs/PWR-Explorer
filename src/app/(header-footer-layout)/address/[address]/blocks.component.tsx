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

type BlockComponentProps = {
	address: string;
	page: number;
	setPage: (page: number) => void;
	count: number;
	setCount: (count: number) => void;
};

export default function BlockComponent({
	address,
	page,
	setPage,
	count,
	setCount,
}: BlockComponentProps) {
	// *~~*~~*~~ Txn history ~~*~~*~~* //

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
		data: blockData,
		isLoading: blockLoading,
		isError: blockError,
	} = useQuery(
		[QUERY_KEYS.blocks_Created, address, page, count],
		() => QueryApi.user.blocksCreated(address, page, count),
		{
			cacheTime: 0,
			onSuccess: (data) => {
				setPaginationMetadata(data.metadata);
			},
		}
	);

	console.log('BlockComponentProps', blockData?.metadata);

	function handlePageChange(page: number) {
		setPage(page);
	}

	if (blockError || (!blockLoading && !blockData)) return <ErrorComponent />;

	if (blockData?.blocks.length === 0) {
		return (
			<section className="overflow-x-auto mt-12">
				<div className="text-center">
					<h1 className="text-agrey-900 dark:text-white">
						This address never participated in the creation of blocks on PWR Chain.
					</h1>
				</div>
			</section>
		);
	}

	return (
		<section className="overflow-x-auto mt-12">
			{/* Title */}
			<div className="flex flex-col lg:flex-row lg:justify-between  lg:items-center gap-y-4">
				{blockLoading ? (
					<div className="skeleton-container space-y-4">
						<div className="skeleton-title w-[300px]"></div>
						<div className="skeleton-line w-[200px]"></div>
					</div>
				) : blockData?.blocks.length === 0 ? null : (
					<>
						<div>
							<h1 className="leading-[26px] px-2 py-1 dark:text-white text-abrandc-dark-grey font-medium">
								More than {blockData?.metadata.totalItems} Blocks found
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
				{blockLoading ? (
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
							{blockData?.blocks.map((block, idx) => (
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
														copyToClipboard(block.blockSubmitter)
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
											{BnToDec(block.blockReward.toString(), 9, 9)} PWR
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
	);
}
