import { BnToDec, shortenAddress, timeAgo } from '@/shared/utils/formatters';
import ROUTES from '@/static/router.data';
import Image from 'next/image';
import Link from 'next/link';

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
						<td className="p-4">
							<div className="flex gap-x-4">
								<div className="hidden xl:block">
									<Image src="/icons/block.svg" width={32} height={32} alt="" />
								</div>
								<div className="flex flex-col md:space-y-2">
									<div className="flex md:block">
										<Link href={`${ROUTES.blocks}/${block.blockHeight}`}>
											<span className="font-medium pr-2 dark:text-ablue-300 text-ablue-200 cursor-pointer">
												{block.blockHeight}
											</span>
										</Link>
										<span className="text-sm dark:text-white text-abrandc-dark-grey md:hidden">
											{timeAgo(block.timeStamp)}
										</span>
									</div>
									<h1 className="text-sm dark:text-white text-abrandc-dark-grey hidden md:block">
										{timeAgo(block.timeStamp)}
									</h1>
								</div>
							</div>
						</td>

						{/* receiver */}
						<td className="p-4">
							<div className="">
								<h1 className="">
									<span className="dark:text-white text-abrandc-dark-grey inline-block md:hidden lg:hidden 2xl:inline-block mr-2">
										Recipient
									</span>
									<Link
										href={`${ROUTES.address}/${block.blockSubmitter}`}
										className="dark:text-ablue-300 text-ablue-200 font-medium "
									>
										{shortenAddress(block.blockSubmitter, 4)}
									</Link>
								</h1>

								<div className="flex justify-between">
									<Link
										href={`${ROUTES.blockTxns(block.blockHeight)}`}
										className="font-medium dark:text-ablue-300 text-ablue-200"
									>
										{block.txnsCount} txns
									</Link>
								</div>
								
							</div>
						</td>

						{/* fee */}
						<td className="p-4 display:hidden">
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
