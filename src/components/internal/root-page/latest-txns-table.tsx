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
						className={`flex flex-col md:table-row p-4 gap-4 ${
							idx % 2 == 0
								? 'dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
								: 'bg-transparent'
						}`}
					>
						{/* txn hash */}
						<td className="md:p-4 p-0">
							<div className="flex gap-x-4 flex-1">
								<Image
									className=" md:block hidden"
									src="/icons/list.svg"
									width={32}
									height={32}
									alt=""
								/>
								<h1 className="block md:hidden dark:text-white text-abrandc-dark-grey">
									TX#
								</h1>
								<div className="flex flex-row md:flex-col  justify-center gap-2">
									{/* block number */}
									<Link
										href={`${ROUTES.transactions}/${txn.txnHash}`}
										className="font-medium pr-2 dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200"
									>
										{shortenAddress(txn.txnHash, 4)}
									</Link>
									<h1 className="text-sm dark:text-white text-abrandc-dark-grey pr-2  ">
										{timeAgo(txn.timeStamp)}
									</h1>
								</div>
							</div>
						</td>

						{/* txn and reward */}
						<td className="md:p-4 p-0 ">
							<div className="flex justify-between items-end">
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

									<h1 className="flex gap-x-2 lg:mt-0 mt-4">
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
											<span className="dark:text-ablue-100 text-ablue-500">
												{txn.to}
											</span>
										)}
									</h1>
								</div>
								<div>
									{/* time ago on smaller screens */}
									<h1 className="xl:p-4 p-0 xl:hidden block">
										<h1 className="dark:bg-agrey-800 bg-ghostly_grey-50 rounded-lg dark:text-white text-abrandc-dark-grey text-sm py-1 px-2 text-center w-[104px]">
											{BnToDec(txn.value, 9, 9)} PWR
										</h1>
									</h1>
								</div>
							</div>
						</td>

						{/* time ago on larger screens */}
						<td className="xl:p-4 p-0 xl:block mt-2 hidden">
							<h1 className="dark:bg-agrey-800 bg-ghostly_grey-50 rounded-lg dark:text-white text-abrandc-dark-grey text-sm py-1 px-2 text-center w-max">
								{BnToDec(txn.value, 9, 9)} PWR
							</h1>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
