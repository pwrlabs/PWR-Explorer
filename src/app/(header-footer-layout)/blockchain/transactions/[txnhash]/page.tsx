'use client';

import 'src/components/internal/checkbox/checkbox.scss';

import Image from 'next/image';
import { useQuery } from 'react-query';

import Button from '@/components/internal/button/button.component';
import Tags from '@/components/internal/tags/tags.component';
import QUERY_KEYS from '@/static/query.keys';
import QueryApi from '@/shared/api/query-api';
import Tooltip from '@/components/internal/tooltip/tooltip.component';
import { BnToDec, timeAgo } from '@/shared/utils/formatters';
import Link from 'next/link';
import ROUTES from '@/static/router.data';

export default function SingleTransaction({ params }) {
	const { txnhash } = params;

	const data = useQuery(
		[QUERY_KEYS.txn_details, txnhash],
		() => QueryApi.transcations.details(txnhash),
		{
			enabled: !!txnhash,
		}
	);

	const section_2_data = [
		{
			label: 'From',
			value: '0x71E5eE8736dghf6578892wuhf6578jdgcni7F4C1681',
		},
		{
			label: 'Interacted with (To)',
			value: '0x71E5eE8736dghf6578892wuhf6578jdgcni7F4C1681',
		},
	];

	const section_3_data = [
		{
			label: 'Value',
			value: '291.005962459849006914 PWR',
			amount: '($214.40)',
		},
		{
			label: 'Transaction Fee',
			value: '0.005962459849006914 PWR',
			amount: '($214.40)',
		},
	];

	const with_ad = false;

	// *~~*~~*~~ functions ~~*~~*~~* //
	function copy(text: string) {
		navigator.clipboard.writeText(text);
	}

	if (data.isLoading) return <div>Loading...</div>;

	if (data.isError) return <div>Error</div>;

	return (
		<div className="container-2 mx-auto dark:text-white text-abrandc-dark-grey">
			{/* Title */}
			<div className="flex xl:flex-row flex-col justify-between items-center">
				<div className="flex flex-1 items-center xl:gap-x-2 gap-x-8 ">
					<h1 className="px-2 py-1 xl:text-[36px] text-[24px] font-bold leading-[44px]">
						Transaction Details
					</h1>
					<Tags>Transfer</Tags>
				</div>
				<div className="flex flex-1 items-center gap-x-2 w-full xl:justify-end justify-center">
					<Button className="blue !h-[36px] xl:w-[120px] w-[40%]">Buy</Button>
					<Button className="blue !h-[36px] xl:w-[120px] w-[40%]">Exchange</Button>
				</div>
			</div>

			<br />

			{/* Transaction details */}
			<div className="">
				<div className={`space-y-4 ${with_ad ? 'max-w-[850px]' : ''}`}>
					{/* First section */}
					<section className="space-y-6">
						{/* Txn Hash */}
						<div className="lg:flex space-y-2">
							<div className="flex items-center gap-x-2 w-[300px]">
								<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
									Transaction Hash
								</h1>
								<Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip>
							</div>
							<div className="flex gap-x-2">
								<h2 className="text-sm break-all">{data.data?.data?.txnHash}</h2>
								<Tooltip text="text" position="up" trigger="click">
									<button onClick={() => copy(data.data?.data?.txnHash)}>
										<i className="far fa-clone text-agrey-500 dark:text-agrey-600" />
									</button>
								</Tooltip>
							</div>
						</div>

						{/* Txn size */}
						<div className="lg:flex space-y-2">
							<div className="flex items-center gap-x-2 w-[300px]">
								<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
									Transaction Size (Bytes)
								</h1>
								<Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip>
							</div>
							<h2>{data.data?.data?.size}</h2>
						</div>

						{/* Block */}
						<div className="lg:flex space-y-2">
							<div className="flex items-center gap-x-2 w-[300px]">
								<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
									Block
								</h1>
								<Tooltip text="" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip>
							</div>
							<div className="flex gap-x-2">
								<div className="flex items-center gap-x-2 ">
									<i className="fas fa-check-circle text-ablue-500 dark:text-ablue-100 fa-lg" />

									<h2 className="dark:text-ablue-100 text-ablue-500 font-medium text-sm">
										{data.data?.data?.blockNumber}
									</h2>
								</div>
								<Tags>1153 Block Confirmations</Tags>
							</div>
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
									{timeAgo(data.data?.data?.timeStamp)},{' '}
									{new Date(data.data?.data?.timeStamp * 1000).toLocaleString()}
									{/* 3 hrs 53 mins ago (May 09 2023 12:13:59 +UTC) */}
								</h2>
							</div>
						</div>
					</section>

					<hr className="dark:border-agrey-800 border-agrey-200 my-4" />

					{/* Second section */}
					<section className="space-y-6">
						{/* From */}
						<div className="lg:flex space-y-2">
							<div className="flex items-center gap-x-2 w-[300px]">
								<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">From</h1>
								<Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip>
							</div>
							<div className="flex items-center gap-x-2">
								<Link
									href={`${ROUTES.address}/${data.data?.data?.from}`}
									className="dark:text-ablue-100 text-ablue-500 font-medium text-sm"
								>
									{/* {item.value} */}
									{data.data?.data?.from}
								</Link>
								<Tooltip text="Copied to clipboard!" position="up" trigger="click">
									<button onClick={() => copy(data.data?.data?.from)}>
										<i className="far fa-clone text-agrey-500 dark:text-agrey-600" />
									</button>
								</Tooltip>
							</div>
						</div>

						{/* To */}
						<div className="lg:flex space-y-2">
							<div className="flex items-center gap-x-2 w-[300px]">
								<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
									Interacted with (To)
								</h1>
								<Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip>
							</div>
							<div className="flex items-center gap-x-2">
								<Link
									href={`${ROUTES.address}/${data.data?.data?.to}`}
									className="dark:text-ablue-100 text-ablue-500 font-medium text-sm"
								>
									{/* {item.value} */}
									{data.data?.data?.to}
								</Link>
								<Tooltip text="Copied to clipboard!" position="up" trigger="click">
									<button onClick={() => copy(data.data?.data?.to)}>
										<i className="far fa-clone text-agrey-500 dark:text-agrey-600" />
									</button>
								</Tooltip>
							</div>
						</div>
					</section>

					<hr className="dark:border-agrey-800 border-agrey-200 my-4" />

					{/* Third section */}
					<section className="space-y-6">
						{/* value */}
						<div className="lg:flex space-y-2">
							<div className="flex items-center gap-x-2 w-[300px]">
								<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
									Value
								</h1>
								<Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip>
							</div>
							<div className="flex items-center gap-x-2 ">
								<Image src="/icons/pwr.svg" width={20} height={20} alt="" />

								<h1 className="leading-[24px] break-all text-sm">
									{BnToDec(data.data?.data?.value, 9, 9)} PWR
									{/* 3 hrs 53 mins ago (May 09 2023 12:13:59 +UTC) */}
								</h1>
								<h1 className="text-agrey-500 dark:text-agrey-600 font-medium text-sm">
									($0.00)
								</h1>
							</div>
						</div>

						{/* fee */}
						<div className="lg:flex space-y-2">
							<div className="flex items-center gap-x-2 w-[300px]">
								<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
									Transaction Fee
								</h1>
								<Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip>
							</div>
							<div className="flex items-center gap-x-2 ">
								<h1 className="leading-[24px] break-all text-sm">
									{BnToDec(data.data?.data?.txnFee, 9, 9)} PWR
									{/* 3 hrs 53 mins ago (May 09 2023 12:13:59 +UTC) */}
								</h1>
								<h1 className="text-agrey-500 dark:text-agrey-600 font-medium text-sm">
									($0.00)
								</h1>
							</div>
						</div>

						{/* Data (Hex) */}
						<div className="lg:flex space-y-2">
							<div className="flex items-center gap-x-2 min-w-[300px]">
								<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
									Data (Hex)
								</h1>
								<Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip>
							</div>
							<div className="flex items-center gap-x-2 flex-grow min-w-0">
								<h1 className="leading-[24px] break-all text-sm">
									{data.data?.data?.data}
								</h1>
								<Tooltip text="Copied to clipboard!" position="up" trigger="click">
									<button onClick={() => copy(data.data?.data?.data)}>
										<i className="far fa-clone text-agrey-500 dark:text-agrey-600" />
									</button>
								</Tooltip>
							</div>
						</div>
					</section>
				</div>

				{/* Ad */}
				{/* {with_ad && (
					<Image
						className="w-[241px] h-auto rounded-[30px]"
						src="/large-images/ad.png"
						width={100}
						height={100}
						alt=""
					/>
				)} */}
			</div>

			<br />

			{/* Disclaimer */}
			<div className="flex items-center gap-x-2 ">
				<i className="far fa-info-circle text-agrey-500 dark:text-agrey-600 " />
				<p className="text-sm text-agrey-500 dark:text-agrey-600 leading-[24px] break-all">
					A transaction is a cryptographically signed instruction that changes the
					blockchain state. Block explorers trach the details of all transactions in
					network.
				</p>
			</div>
		</div>
	);
}
