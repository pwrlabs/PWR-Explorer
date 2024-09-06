import Image from 'next/image';
import Link from 'next/link';

import { BnToDec, shortenAddress, timeAgo } from 'src/shared/utils/formatters';

import ROUTES from 'src/static/router.data';

type Block = {
	blockHeight: number;
	timeStamp: number;
	blockSubmitter: string;
	txnsCount: number;
	blockReward: string;
};

type LatestBlocksProps = {
	blocks: Block[];
};

export default function LatestBlocksTable({ blocks }: LatestBlocksProps) {
	return (
		<table className="table-auto bg-awhite w-full rounded-lg overflow-hidden">
			{/* table body */}
			<tbody className="">
				{blocks.map((block, idx) => (
					<tr
						key={idx}
						className={`flex flex-col md:table-row ${
							idx % 2 == 0
								? ' dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
								: 'bg-transparent'
						}`}
					>
						{/* block height */}
						<td className="lg:p-4 p-2">
							<div className="flex gap-x-4">
								<Image
									className=" xl:block hidden"
									src="/icons/block.svg"
									width={32}
									height={32}
									alt=""
								/>
								<div className="lg:space-y-2 lg:block flex  items-center gap-x-2">
									{/* block number */}
									<Link
										href={`${ROUTES.blocks}/${block.blockHeight}`}
										className="font-medium pr-2 dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200"
									>
										{block.blockHeight}
									</Link>
									<h1 className="text-sm dark:text-white text-abrandc-dark-grey pr-2">
										{timeAgo(block.timeStamp)}
									</h1>
								</div>
							</div>
						</td>

						{/* receiver */}
						<td className="lg:p-4 p-2">
							<div className="">
								<h1 className="">
									<span className="dark:text-white text-abrandc-dark-grey inline-block md:hidden lg:hidden 2xl:inline-block mr-2">
										Recipient
									</span>
									<Link
										href={`${ROUTES.address}/${block.blockSubmitter}`}
										className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 font-medium "
									>
										{shortenAddress(block.blockSubmitter, 4)}
									</Link>
								</h1>

								<br className="sm:hidden" />

								<div className="flex gap-x-2">
									<Link
										href={`${ROUTES.blockTxns(block.blockHeight)}`}
										className="font-medium dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200"
									>
										{block.txnsCount} txns	
									</Link>

									<div className="sm:hidden">
										<h1 className="dark:bg-agrey-800 bg-ghostly_grey-50 rounded-lg dark:text-white text-abrandc-dark-grey text-sm py-1 px-2 text-center w-[130px]">
											{BnToDec(block.blockReward, 9, 9)} PWR
										</h1>
									</div>
								</div>
							</div>
						</td>

						{/* fee */}
						<td className="hidden sm:table-cell lg:p-4">
							<div>
								<h1 className="dark:bg-agrey-800 bg-ghostly_grey-50 rounded-lg dark:text-white text-abrandc-dark-grey text-sm py-1 px-2 text-center w-[130px]">
									{BnToDec(block.blockReward, 9, 9)} PWR
								</h1>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
