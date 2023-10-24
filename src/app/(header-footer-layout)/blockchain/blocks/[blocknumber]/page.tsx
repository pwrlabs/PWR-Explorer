'use client';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/internal/button/button.component';
import Tags from '@/components/internal/tags/tags.component';
import { useQuery } from 'react-query';
import QUERY_KEYS from '@/static/query.keys';
import QueryApi from '@/shared/api/query-api';
import Tooltip from '@/components/internal/tooltip/tooltip.component';
import { BnToDec, timeAgo } from '@/shared/utils/formatters';
import ROUTES from '@/static/router.data';

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

	console.log(block_data);

	const section_2_data = [
		{
			label: 'Block Reward',
			value: '0.047598858328293488 PWR (0 + 0.981970538585756278 - 0.93437168025746279',
		},
		{
			label: 'Size',
			value: '86,992 bytes',
		},
	];

	return (
		<div className="container-2 mx-auto dark:text-white text-abrandc-dark-grey">
			{/* Title */}
			<div className="flex items-center gap-x-2">
				<h1 className="px-2 py-1 text-[36px] font-bold leading-[44px]">Blocks Details</h1>
				<Tags>{blockNum}</Tags>
			</div>

			{/* Block details */}
			<div className="space-y-4 mt-12">
				{/* First section */}
				<section className="space-y-6 lg:space-y-4">
					{/* Block height */}
					<div className="lg:flex space-y-2">
						<div className="flex items-center gap-x-2 w-[300px]">
							<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
								Block Height
							</h1>
							<Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip>
						</div>
						<h2 className="text-sm">{blockNum}</h2>
					</div>

					{/* Timestamp */}
					<div className="lg:flex space-y-2">
						<div className="flex items-center gap-x-2 w-[300px]">
							<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
								Timestamp
							</h1>
							<Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip>
						</div>
						<div className="flex items-center gap-x-2 ">
							<i className="far fa-clock text-agrey-500 dark:text-agrey-600 fa-lg" />

							<h2 className="leading-[24px] break-all text-sm">
								{timeAgo(block_data?.data?.timeStamp)},{' '}
								{new Date(block_data?.data?.timeStamp * 1000).toLocaleString()}
								{/* 3 hrs 53 mins ago (May 09 2023 12:13:59 +UTC) */}
							</h2>
						</div>
					</div>

					{/* Proposed on */}
					<div className="lg:flex space-y-2">
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
					</div>

					{/* Transactions */}
					<div className="lg:flex space-y-2">
						<div className="flex items-center gap-x-2 w-[300px]">
							<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
								Transactions
							</h1>
							<Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip>
						</div>
						<div className="flex items-center gap-x-2 ">
							<h2 className="leading-[24px] break-all text-sm">
								<Link
									href={ROUTES.blockTxns(blockNum)}
									className="dark:text-ablue-100 text-ablue-500 font-medium"
								>
									{block_data?.data?.txnsCount} transactions
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
							<Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip>
						</div>
						<div className="flex gap-x-2">
							<Link
								href={ROUTES.address}
								className="dark:text-ablue-100 text-ablue-500 font-medium"
							>
								{block_data?.data?.blockSubmitter}
							</Link>{' '}
							<Tooltip text="text" position="up" trigger="click">
								<button onClick={() => copy(data.data?.data?.txnHash)}>
									<i className="far fa-clone text-agrey-500 dark:text-agrey-600" />
								</button>
							</Tooltip>
							<div>in 12 secs</div>
						</div>
					</div>

					{/* Reward */}
					<div className="lg:flex space-y-2">
						<div className="flex items-center gap-x-2 w-[300px]">
							<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
								Block Reward
							</h1>
							<Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip>
						</div>
						<h2 className="text-sm">
							{BnToDec(block_data?.data?.blockReward, 9, 9)} PWR
						</h2>
					</div>

					{/* Size */}
					<div className="lg:flex space-y-2">
						<div className="flex items-center gap-x-2 w-[300px]">
							<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">Size</h1>
							<Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip>
						</div>
						<h2 className="text-sm">{block_data?.data?.blockSize} Bytes</h2>
					</div>

					{/* Block confirmations */}
					<div className="lg:flex space-y-2">
						<div className="flex items-center gap-x-2 w-[300px]">
							<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
								Number of Block Confirmations
							</h1>
							<Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip>
						</div>
						<h2 className="text-sm">{block_data?.data?.blockConfirmations}</h2>
					</div>
				</section>
				<hr className="dark:border-agrey-800 border-agrey-200 my-4" />
				{/* Third section */}
				<section className="space-y-6 lg:space-y-4">
					{/* Burnt fees */}
					<div className="lg:flex space-y-2">
						<div className="flex items-center gap-x-2 w-[300px]">
							<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
								Burnt Fees
							</h1>
							<Tooltip text="text" large position="right">
								<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
							</Tooltip>
						</div>
						<h2 className="text-sm">
							{BnToDec(block_data?.data?.blockReward, 9, 9)} PWR
						</h2>
					</div>
				</section>

				<br />

				{/* Disclaimer */}
				<div className="flex items-center gap-x-2 ">
					<i className="far fa-info-circle text-agrey-500 dark:text-agrey-600 " />
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
