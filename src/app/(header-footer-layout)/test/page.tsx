'use client';

import Image from 'next/image';

import QueryApi from '@/shared/api/query-api';
import timeAgo, { BnToDec, shortenAddress } from '@/shared/utils/formatters';
import QUERY_KEYS from '@/static/query.keys';
import Link from 'next/link';
import { useQuery } from 'react-query';
import Button from 'src/components/internal/button/button.component';

const headers = [
	{
		id: 0,
		name: 'Txn Hash',
	},
	{
		id: 1,
		name: 'Block',
	},
	{
		id: 2,
		name: 'Timestamp',
	},
	{
		id: 3,
		name: 'From',
	},
	{
		id: 4,
		name: '', // Direction
	},
	{
		id: 5,
		name: 'To',
	},
	{
		id: 6,
		name: 'Value',
	},
];

export default function TestPage() {
	const {
		data: txnsData,
		isLoading: txnsLoading,
		isError: txnsError,
	} = useQuery([QUERY_KEYS.latest_txns], () => QueryApi.transcations.latest(10));

	console.log('🚀 ~ file: page.tsx:9 ~ TestPage ~ txnsData:', txnsData);
	return (
		<div className="container">
			<table className="table-auto">
				{/* table header */}
				<thead className="sticky top-0">
					<tr>
						{headers.map((header, idx) => (
							<th className=" dark:text-white text-abrandc-dark-grey" key={idx}>
								{header.name.length > 0 && (
									<div className="flex px-2 py-1 justify-center items-center gap-x-2">
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
					{txnsLoading ? (
						<div>Loading...</div>
					) : (
						txnsData?.data?.txns.map((txn, idx) => (
							<tr
								key={txn.txnHash}
								className={`${
									idx % 2 == 0
										? ' dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
										: 'bg-transparent'
								}`}
							>
								{/* txn hash */}
								<td className="px-12 py-8">
									<div className="flex gap-x-2">
										<div>
											<Image
												className="w-auto h-auto"
												src="/icons/eye.svg"
												width={20}
												height={20}
												alt=""
											/>
										</div>

										<Link
											href="/"
											className="dark:text-ablue-300 text-ablue-200 font-medium"
										>
											{shortenAddress(txn.txnHash)}
										</Link>
									</div>
								</td>

								{/* block */}
								<td className="px-12 py-8">
									<Link
										href="/"
										className="dark:text-ablue-300 text-ablue-200 font-medium"
									>
										{txn.blockNumber}
									</Link>
								</td>

								{/* time ago */}
								<td className="px-12 py-8">
									<div className="dark:text-white text-abrandc-dark-grey font-normal">
										{timeAgo(txn.timeStamp)}
									</div>
								</td>

								{/* from */}
								<td className="px-12 py-8">
									<div className="flex gap-x-2">
										<Link
											href="/"
											className="dark:text-ablue-100 text-ablue-500 font-medium"
										>
											{shortenAddress(txn.from, 4)}
										</Link>

										<button className="text-agrey-500 dark:text-agrey-600">
											<i className="far fa-clone" />
										</button>
									</div>
								</td>

								{/* direction */}
								<td className="px-12 py-8">
									<div className="w-6 h-6 bg-violet-100 dark:bg-agrey-800 rounded-full grid place-items-center">
										<div className="text-agrey-500 dark:text-agrey-600">
											<i className="fas fa-arrow-right fa-sm" />
										</div>
									</div>
								</td>

								{/* To */}
								<td className="px-12 py-8">
									<div className="flex gap-x-2">
										<Link
											href="/"
											className="dark:text-ablue-100 text-ablue-500 font-medium"
										>
											{shortenAddress(txn.to, 4)}
										</Link>

										<button className="text-agrey-500 dark:text-agrey-600">
											<i className="far fa-clone" />
										</button>
									</div>
								</td>

								{/* value */}
								<td className="px-12 py-8">
									<div className="dark:text-white text-abrandc-dark-grey font-normal">
										{BnToDec(txn.value, 9)} PWR
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
