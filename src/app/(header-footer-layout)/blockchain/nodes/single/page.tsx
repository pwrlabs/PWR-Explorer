'use client';
import Pagination from 'src/components/internal/pagination/pagination.component';
import Tags from 'src/components/internal/tags/tags.component';
import Tooltip from 'src/components/internal/tooltip/tooltip.component';
import { BnToDec, shortenAddress } from 'src/shared/utils/formatters';
import { copyToClipboard } from 'src/shared/utils/functions';
import ROUTES from 'src/static/router.data';
import Image from 'next/image';
import Link from 'next/link';

const headers = [
	{
		id: 0,
		name: 'Node ID',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 1,
		name: 'Host',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 2,
		name: 'Country',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 3,
		name: 'Burned/Staked (PWR)',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 4,
		name: 'Earnings (PWR)',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 5,
		name: 'Blocks per Round',
		thClass: 'xl:px-8 px-2',
	},
	{
		id: 6,
		name: 'Transactions Processed',
		thClass: 'xl:px-8 px-2',
	},
];

export default function Single() {
	const block = '17222820';

	const zero = '0x0000000000000000000000000000000000000000';

	return (
		<div className="container-2 mx-auto text-white">
			{/* Title */}
			<h1 className="px-2 py-1 text-[36px] font-bold leading-[44px]">Nodes Tracker</h1>

			{/* Nodes details */}
			<div className="space-y-2 py-1">
				<div className="flex items-center justify-between">
					<div className="flex items-center font-medium">
						<h2 className="px-2">A total of 701829 Nodes found</h2>
						<h3 className="text-ablue-100 px-1">{block}</h3>
					</div>
					<div className="flex gap-x-3 text-sm">
						<h2>First</h2>
						<h2>Last</h2>
					</div>
				</div>
				<h3 className="text-xs font-medium px-2">(Showing the last 10000 records only)</h3>
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
						{Array.from({ length: 10 }).map((txn, idx) => (
							<tr
								key={idx}
								className={` ${
									idx % 2 == 0
										? ' dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
										: 'bg-transparent'
								}`}
							>
								{/* node id */}
								<td className="xl:px-8 px-2 py-8">
									<div className="flex gap-x-2 justify-start">
										<Link
											href={`${ROUTES.transactions}/${zero}`}
											className="dark:text-ablue-300 text-ablue-200 font-medium"
										>
											{shortenAddress(zero)}
										</Link>

										<Tooltip
											text="Copied to clipbloard"
											position="up"
											trigger="click"
										>
											<button
												className="text-agrey-500 dark:text-agrey-600"
												onClick={() => copyToClipboard(zero)}
											>
												<i className="far fa-clone" />
											</button>
										</Tooltip>
									</div>
								</td>

								{/* Host */}
								<td className="xl:px-8 px-2 py-8">
									<div className="dark:text-white text-abrandc-dark-grey font-normal text-center">
										54.7942.188
									</div>
								</td>

								{/* Country */}
								<td className="xl:px-8 px-2 py-8">
									<div className="dark:text-white text-abrandc-dark-grey font-normal text-center">
										Germany
									</div>
								</td>

								{/* Burned */}
								<td className="xl:px-8 px-2 py-8">
									<div className="flex justify-center">
										<div className="dark:text-white text-abrandc-dark-grey font-normal text-center">
											0.49867
										</div>
									</div>
								</td>

								{/* Earnings (PWR) */}
								<td className="xl:px-8 px-2 py-8">
									<div className="flex justify-center">
										<div className="dark:text-white text-abrandc-dark-grey font-normal text-center">
											0.49867
										</div>
									</div>
								</td>

								{/* Blocks per round */}
								<td className="xl:px-8 px-2 py-8">
									<div className="dark:text-white text-abrandc-dark-grey font-normal text-center">
										1918
									</div>
								</td>

								{/* Transactions Processed */}
								<td className="xl:px-8 px-2 py-8">
									<div className="dark:text-white text-abrandc-dark-grey font-normal text-center">
										1918
									</div>
								</td>
							</tr>
						))}
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
						previousPage: -1,
					}}
					onPageChange={(page: number) => {}}
				/>
			</div>
		</div>
	);
}
