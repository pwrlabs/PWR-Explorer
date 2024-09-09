import Image from 'next/image';
import Link from 'next/link';

import { BnToDec, shortenAddress, timeAgo } from 'src/shared/utils/formatters';
import { isAddress } from 'src/shared/utils/functions';

import ROUTES from 'src/static/router.data';

type Txn = {
	txnHash: string;
	timeStamp: number;
	from: string;
	to: string;
	value: string;
};

type LatestTransactionsProps = {
	transactions: Txn[];
};

export default function LatestTxnsTable({ transactions }: LatestTransactionsProps) {
	return (
		<table className="table-auto bg-awhite w-full rounded-lg overflow-hidden">
			{/* table body */}
			<tbody className="">
				{transactions.map((txn, idx) => (
					<tr
						key={idx}
						className={`flex flex-col md:table-row  ${
							idx % 2 == 0
								? ' dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
								: 'bg-transparent'
						}`}
					>
						{/* txn hash */}
						<td className="p-4">
							<div className="flex gap-x-4 flex-1">
								<Image
									className=" xl:block hidden"
									src="/icons/list.svg"
									width={32}
									height={32}
									alt=""
								/>
								<div className="space-y-2 ">
									{/* block number */}
									<Link
										href={`${ROUTES.transactions}/${txn.txnHash}`}
										className="font-medium pr-2 dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200"
									>
										{shortenAddress(txn.txnHash, 4)}
									</Link>
									<h1 className="text-sm dark:text-white text-abrandc-dark-grey pr-2">
										{timeAgo(txn.timeStamp)}
									</h1>
								</div>
							</div>
						</td>

						{/* txn and reward */}
						<td className="p-4">
							<div>
								<h1 className="flex gap-x-2">
									<div className="dark:text-white text-abrandc-dark-grey">
										From
									</div>
									<Link
										href={`${ROUTES.address}/${txn.from}`}
										className="font-medium dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 pl-1"
									>
										{shortenAddress(txn.from, 4)}
									</Link>
								</h1>

								<h1 className="flex gap-x-2">
									<span className="dark:text-white text-abrandc-dark-grey">
										To
									</span>
									{isAddress(txn.to) ? (
										<Link
											href={`${ROUTES.address}/${txn.to}`}
											className="dark:text-ablue-100 text-ablue-500 font-medium dark:hover:text-ablue-300 hover:text-ablue-200"
										>
											{shortenAddress(txn.to, 4)}
										</Link>
									) : (
										<span className="dark:text-ablue-100 text-ablue-500 	">
											{txn.to}
										</span>
									)}
								</h1>
							</div>
						</td>

						{/* time ago */}
						<td className="p-2">
							<h1 className="dark:bg-agrey-800 bg-ghostly_grey-50 rounded-lg dark:text-white text-abrandc-dark-grey text-sm py-1 px-2 text-center w-[120px]">
								{BnToDec(txn.value, 9, 9)} PWR
							</h1>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
