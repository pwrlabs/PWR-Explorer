'use client';
import Link from 'next/link';

import { useQuery } from 'react-query';

import Tags from 'src/components/internal/tags/tags.component';
import Tooltip from 'src/components/internal/tooltip/tooltip.component';
import ErrorComponent from 'src/components/error/error.component';
import TransactionDetailSkeleton from 'src/components/skeletons/transactions/txn-detail.skeleton';

import QueryApi from 'src/shared/api/query-api';
import dateToText, { BnToDec, timeAgo } from 'src/shared/utils/formatters';
import { copyToClipboard } from 'src/shared/utils/functions';

import QUERY_KEYS from 'src/static/query.keys';
import ROUTES from 'src/static/router.data';

type BlockTransactionsProps = {
	params: {
		blocknumber: number;
	};
};

export default function SingleBlock({ params }: BlockTransactionsProps) {
	const blockNum = params.blocknumber;

	const {
		data: block_data,
		isLoading: block_loading,
		isError: block_error,
	} = useQuery([QUERY_KEYS.block_details, blockNum], () => QueryApi.blocks.details(blockNum));

	// *~~*~~*~~ Skeleton function ~~*~~*~~* //
	function renderTxnDetailsSkeleton(amount: number) {
		return (
			<section className="space-y-6 lg:space-y-4">
				{new Array(amount).fill(0).map((_, i) => (
					<TransactionDetailSkeleton key={i} />
				))}
			</section>
		);
	}

	if (block_error || (!block_loading && !block_data)) return <ErrorComponent />;

	return (
		<div className="container-2 mx-auto dark:text-white text-abrandc-dark-grey pb-6">
			{/* Title */}
			<div className="flex items-center gap-x-2">
				<h1 className=" py-1 text-[36px] font-bold leading-[44px]">Blocks Details</h1>
				<Tags>{blockNum}</Tags>
			</div>

			{/* Block details */}
			<div className="space-y-4 mt-12">
				{block_loading ? (
					<>
						{renderTxnDetailsSkeleton(3)}
						<hr className="dark:border-agrey-800 border-agrey-200 my-4" />
						{renderTxnDetailsSkeleton(3)}
					</>
				) : (
					<>
						{/* First section */}
						<section className="space-y-6 lg:space-y-4">
							{/* Block height */}
							<div className="lg:flex space-y-2">
								<div className="flex items-center gap-x-2 w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm ">
										Block Height
									</h1>
									{/* <Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip> */}
								</div>
								<h2 className="text-sm">{blockNum}</h2>
							</div>
							<div className="lg:flex space-y-2">
								<div className="flex items-center gap-x-2 w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm ">
										Block Hash
									</h1>
									{/* <Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip> */}
								</div>
								<h2 className="text-sm">{block_data.blockHash}</h2>
							</div>
							<div className="lg:flex space-y-2">
								<div className="flex items-center gap-x-2 w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
										Status
									</h1>
									{/* <Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip> */}
								</div>
								<div className="flex items-center w-fit bg-abrandc-light-lightGreen dark:bg-gray-800 text-abrandc-light-green font-medium text-bold border border-abrandc-light-green rounded-lg px-2 ">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 18 18"
										fill="none"
									>
										<circle cx="9" cy="9" r="6.75" fill="#009545" />
										<path
											d="M6 9.34517L7.95126 11.2206C7.99202 11.2598 8.05807 11.2598 8.09884 11.2206L12.75 6.75"
											stroke="white"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>

									<span className="ml-2 py-1">Success</span>
								</div>
							</div>
							{/* Timestamp */}
							<div className="lg:flex space-y-2">
								<div className="flex items-center gap-x-2 w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
										Timestamp
									</h1>
									{/* <Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip> */}
								</div>
								<div className="flex items-center gap-x-2 ">
									<i className="far fa-clock text-agrey-500 dark:text-agrey-600 fa-lg" />

									<h2 className="leading-[24px] break-all text-sm">
										{timeAgo(block_data.timeStamp)} (
										{dateToText(block_data.timeStamp)})
										{/* 3 hrs 53 mins ago (May 09 2023 12:13:59 +UTC) */}
									</h2>
								</div>
							</div>

							{/* Proposed on */}
							{/* <div className="lg:flex space-y-2">
						<div className="flex items-center gap-x-2 w-[300px]">
							<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
								Proposed on
							</h1>
							<Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip>
						</div>
						<div className="flex items-center gap-x-2 ">
							<h2 className="leading-[24px] break-all text-sm">
								Block proposed on slot{' '}
								<span className="dark:text-ablue-100 text-ablue-500 font-medium">
									6420882
								</span>{' '}
								epoch{' '}
								<span className="dark:text-ablue-100 text-ablue-500 font-medium">
									6420882
								</span>
							</h2>
						</div>
					</div> */}

							{/* Transactions */}
							<div className="lg:flex space-y-2">
								<div className="flex items-center gap-x-2 w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
										Transactions
									</h1>
									{/* <Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip> */}
								</div>
								<div className="flex items-center gap-x-2 ">
									<h2 className="leading-[24px] break-all text-sm">
										<Link
											href={ROUTES.blockTxns(blockNum)}
											className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 font-medium"
										>
											{block_data.txnsCount} transactions
										</Link>{' '}
										in this block
									</h2>
								</div>
							</div>
						</section>

						<hr className="dark:border-agrey-800 border-agrey-200 my-4" />

						{/* Second section */}
						<section className="space-y-6 lg:space-y-4">
							{/* Fee */}
							<div className="lg:flex space-y-2">
								<div className="flex items-center gap-x-2 w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
										Fee Recipient
									</h1>
									{/* <Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip> */}
								</div>
								<div className="flex gap-x-2  gap-y-2">
									<Link
										href={`${ROUTES.address}/${block_data.blockSubmitter}`}
										className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 font-medium text-ellipsis  overflow-hidden"
									>
										{block_data.blockSubmitter}
									</Link>
									<Tooltip
										text="copied to clipboard"
										position="up"
										trigger="click"
									>
										<button
											onClick={() =>
												copyToClipboard(block_data.blockSubmitter)
											}
										>
											<i className="far fa-clone dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200" />
										</button>
									</Tooltip>
								</div>
							</div>

							{/* Reward */}
							<div className="lg:flex space-y-2">
								<div className="flex items-center gap-x-2 w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
										Block Reward
									</h1>
									{/* <Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip> */}
								</div>
								<h2 className="text-sm">
									{BnToDec(block_data.blockReward, 9, 9)} PWR
								</h2>
							</div>

							{/* Size */}
							<div className="lg:flex space-y-2">
								<div className="flex items-center gap-x-2 w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
										Size
									</h1>
									{/* <Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip> */}
								</div>
								<h2 className="text-sm">{block_data.blockSize} Bytes</h2>
							</div>
						</section>
					</>
				)}

				<br />

				{/* Disclaimer */}
				<div className="flex  gap-x-2 ">
					<i className="far fa-info-circle text-agrey-500 dark:text-agrey-600 align-middle mt-2 " />
					<p className="text-sm text-agrey-500 dark:text-agrey-600 leading-[24px] break-all">
						Blocks are batches of transactions linked via cryptographic hashes. Any
						tampering of a block would invalidate all following blocks as all subsequent
						hashes would change.
					</p>
				</div>
			</div>
		</div>
	);
}
