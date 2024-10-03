'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useQuery } from 'react-query';

import Tags from 'src/components/internal/tags/tags.component';
import Tooltip from 'src/components/internal/tooltip/tooltip.component';
import ErrorComponent from 'src/components/error/error.component';
import TransactionDetailSkeleton from 'src/components/skeletons/transactions/txn-detail.skeleton';

import QueryApi from 'src/shared/api/query-api';
import dateToText, { BnToDec, scNotToDec, timeAgo } from 'src/shared/utils/formatters';
import { copyToClipboard, isAddress } from 'src/shared/utils/functions';

import QUERY_KEYS from 'src/static/query.keys';
import ROUTES from 'src/static/router.data';

import 'src/components/internal/checkbox/checkbox.scss';

type TransactionDetailsProps = {
	params: {
		txnhash: string;
	};
};

export default function TransactionDetails({ params }: TransactionDetailsProps) {
	const { txnhash } = params;

	const {
		data: txnData,
		isLoading: txnLoading,
		isError: txnError,
	} = useQuery([QUERY_KEYS.txn_details, txnhash], () => QueryApi.transactions.details(txnhash), {
		enabled: !!txnhash,
	});

	const with_ad = false;

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

	if (txnError || (!txnLoading && !txnData)) return <ErrorComponent />;

	return (
		<div className="container-2 mx-auto dark:text-white text-abrandc-dark-grey">
			{/* Title */}
			<div className="flex xl:flex-row flex-col justify-between xl:items-center">
				<div className="flex flex-1 items-center xl:gap-x-2 gap-x-8 ">
					<h1 className=" xl:text-4xl text-2xl font-bold leading-[44px]">
						Transaction Details
					</h1>
					{txnLoading ? (
						<div className="skeleton-container">
							<div className="skeleton-box w-16 rounded-lg"></div>
						</div>
					) : (
						<Tags className="capitalize">{txnData.txnType}</Tags>
					)}
				</div>
				{/* <div className="flex-1 items-center gap-x-2 w-full xl:justify-end justify-center hidden lg:flex">
					<Button className="blue !h-[36px] xl:w-[120px] w-[40%]">Buy</Button>
					<Button className="blue !h-[36px] xl:w-[120px] w-[40%]">Exchange</Button>
				</div> */}
			</div>

			<br />

			{/* Transaction details */}
			<div className="">
				<div className={`space-y-4 ${with_ad ? 'max-w-[850px]' : ''}`}>
					{/* First section, hash, size, block and timestamp */}

					{txnLoading ? (
						renderTxnDetailsSkeleton(3)
					) : (
						<section className="space-y-6 lg:space-y-4">
							{/* Txn Hash */}
							<div className="lg:flex space-y-2">
								<div className="flex items-center gap-x-2 w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
										Transaction Hash
									</h1>
									{/* <Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip> */}
								</div>
								<div className="flex gap-x-2">
									<h2 className="text-sm break-all">{txnData.txnHash}</h2>
									<Tooltip
										text="Copied to clipboard!"
										position="up"
										trigger="click"
									>
										<button onClick={() => copyToClipboard(txnData.txnHash)}>
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
									{/* <Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip> */}
								</div>
								<h2>{txnData.size}</h2>
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
								{txnData.success ? (
									// Success Status
									<div className="flex items-center w-fit bg-abrandc-light-lightGreen dark:bg-gray-800 text-abrandc-light-green font-medium text-bold border border-abrandc-light-green rounded-lg px-2">
										<svg
											width="22"
											height="22"
											viewBox="0 0 18 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle cx="9" cy="9" r="6.75" fill="#00B85B" />
											<path
												d="M6 9.34517L7.95126 11.2206C7.99202 11.2598 8.05807 11.2598 8.09884 11.2206L12.75 6.75"
												stroke="white"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
										<span className="ml-2 py-1 font-medium">Success</span>
									</div>
								) : (
									// Fail Status with Error Message
									<div className="flex items-center justify-center gap-4">
										<div className="flex items-center dark:bg-gray-800 text-ared-400 text-bold border border-ared-400 rounded-lg px-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="22"
												height="22"
												viewBox="0 0 18 18"
												fill="none"
											>
												<circle cx="9" cy="9" r="6.75" fill="#F65251" />
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M6.11461 6.11461C6.26742 5.9618 6.51518 5.9618 6.668 6.11461L9 8.44661L11.332 6.11461C11.4848 5.9618 11.7326 5.9618 11.8854 6.11461C12.0382 6.26742 12.0382 6.51518 11.8854 6.668L9.55339 9L11.8854 11.332C12.0382 11.4848 12.0382 11.7326 11.8854 11.8854C11.7326 12.0382 11.4848 12.0382 11.332 11.8854L9 9.55339L6.668 11.8854C6.51518 12.0382 6.26742 12.0382 6.11461 11.8854C5.9618 11.7326 5.9618 11.4848 6.11461 11.332L8.44661 9L6.11461 6.668C5.9618 6.51518 5.9618 6.26742 6.11461 6.11461Z"
													fill="white"
												/>
											</svg>
											<span className="ml-2 py-1 font-medium">Fail</span>
										</div>
										{/* Error message if it exists */}
										{txnData.errorMessage && (
											<div className="">
												<p className="text-ared-400 font-medium">
													{txnData.errorMessage}
												</p>
											</div>
										)}
									</div>
								)}
							</div>

							{/* Block */}
							<div className="lg:flex space-y-2">
								<div className="flex items-center gap-x-2 w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
										Block
									</h1>
									{/* <Tooltip text="" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip> */}
								</div>
								<div className="flex gap-x-2">
									<div className="flex items-center gap-x-2 ">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
										>
											<circle cx="12" cy="12" r="9" fill="#112FF8" />
											<path
												d="M8 12.4602L10.6017 14.9608C10.656 15.013 10.7441 15.0131 10.7985 14.9608L17 9"
												stroke="white"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>{' '}
										<Link
											href={`${ROUTES.blocks}/${txnData.blockNumber}`}
											className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 font-medium text-sm"
										>
											{txnData.blockNumber}
										</Link>
										{/* <h2 className="dark:text-ablue-100 text-ablue-500 font-medium text-sm">
											{txnData.blockNumber}
										</h2> */}
									</div>
									{/* <Tags>1153 Block Confirmations</Tags> */}
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
										{timeAgo(txnData.timeStamp)} (
										{dateToText(txnData.timeStamp)})
										{/* 3 hrs 53 mins ago (May 09 2023 12:13:59 +UTC) */}
									</h2>
								</div>
							</div>
						</section>
					)}

					<hr className="dark:border-agrey-800 border-agrey-200 my-4" />

					{/* Second section, from and to */}
					{txnLoading ? (
						renderTxnDetailsSkeleton(2)
					) : (
						<section className="space-y-6 lg:space-y-4">
							{/* From */}
							<div className="lg:flex space-y-2">
								<div className="flex items-center gap-x-2 w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
										From
									</h1>
									{/* <Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip> */}
								</div>
								<div className="flex items-center gap-x-2 ">
									<Link
										href={`${ROUTES.address}/${txnData.from}`}
										className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 font-medium text-sm truncate overflow-hidden whitespace-nowrap"
									>
										{txnData.from}
									</Link>
									<Tooltip
										text="Copied to clipboard!"
										position="up"
										trigger="click"
									>
										<button onClick={() => copyToClipboard(txnData.from)}>
											<i className="far fa-clone dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200" />
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
									{/* <Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip> */}
								</div>
								<div className="flex items-center gap-x-2">
									{isAddress(txnData.to) ? (
										<>
											<Link
												href={`${ROUTES.address}/${txnData.to}`}
												className="dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200 font-medium text-sm"
											>
												{/* {item.value} */}
												{txnData.to}
											</Link>
											<Tooltip
												text="Copied to clipboard!"
												position="up"
												trigger="click"
											>
												<button onClick={() => copyToClipboard(txnData.to)}>
													<i className="far fa-clone  text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200" />
												</button>
											</Tooltip>
										</>
									) : (
										<div className=" font-medium text-sm">{txnData.to}</div>
									)}
								</div>
							</div>
						</section>
					)}

					<hr className="dark:border-agrey-800 border-agrey-200 my-4" />

					{/* Third section, price, usd price and data */}
					{txnLoading ? (
						renderTxnDetailsSkeleton(3)
					) : (
						<section className="space-y-6 lg:space-y-4">
							{/* value */}
							<div className="lg:flex space-y-2">
								<div className="flex items-center gap-x-2 w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
										Value
									</h1>
									{/* <Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip> */}
								</div>
								<div className="flex items-center gap-x-2 ">
									<Image src="/icons/pwr.svg" width={20} height={20} alt="" />

									<h1 className="leading-[24px] break-all text-sm">
										{BnToDec(txnData.value, 9, 9)} PWR
										{/* 3 hrs 53 mins ago (May 09 2023 12:13:59 +UTC) */}
									</h1>
									{/* <h1 className="text-agrey-500 dark:text-agrey-600 font-medium text-sm">
										(${txnData.valueInUsd})
									</h1> */}
								</div>
							</div>

							{/* fee */}
							<div className="lg:flex space-y-2">
								<div className="flex items-center gap-x-2 w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
										Transaction Fee
									</h1>
									{/* <Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip> */}
								</div>
								<div className="flex items-center gap-x-2 ">
									<h1 className="leading-[24px] break-all text-sm">
										{BnToDec(txnData.txnFee, 9, 9)} PWR
										{/* 3 hrs 53 mins ago (May 09 2023 12:13:59 +UTC) */}
									</h1>
									{/* <h1 className="text-agrey-500 dark:text-agrey-600 font-medium text-sm">
										($
										{scNotToDec(+txnData.txnFeeInUsd, 10)})
									</h1> */}
								</div>
							</div>

							{/* Data (Hex) */}
							<div className="lg:flex space-y-2">
								<div className="flex items-start gap-x-2 min-w-[300px]">
									<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
										Data (Hex)
									</h1>
									{/* <Tooltip text="text" large position="right">
									<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
								</Tooltip> */}
								</div>
								<div className=" flex-grow min-w-0  border border-agrey-300 rounded-[12px] p-3">
									<div className="w-full flex justify-between mb-2">
										<h1></h1>
										<Tooltip
											text="Copied to clipboard!"
											position="up"
											trigger="click"
											className="text-right"
										>
											<button
												onClick={() =>
													copyToClipboard(txnData.data || '0x')
												}
											>
												<i className="far fa-clone   text-agrey-500 dark:hover:text-ablue-300 hover:text-ablue-200" />
											</button>
										</Tooltip>
									</div>

									<h1 className="leading-[24px] break-all text-sm">
										{txnData.data || '0x'}
									</h1>
								</div>
							</div>
							{/* flex  items-center justify-between gap-x-2 */}
							{/* Extra Data */}

							{txnData.extraData ? (
								<div className="lg:flex space-y-2">
									<div className="flex items-start gap-x-2 min-w-[300px]">
										<h1 className="text-agrey-500 dark:text-agrey-600 text-sm">
											Extra Data (JSON)
										</h1>
										{/* <Tooltip text="text" large position="right">
										<i className="fa-sm far fa-info-circle text-agrey-500 dark:text-agrey-600" />
									</Tooltip> */}
									</div>
									<div className="flex items-start justify-between gap-x-2 flex-grow min-w-0">
										<pre className="leading-[24px] text-sm">
											<code>
												{JSON.stringify(txnData.extraData, null, 2)}
											</code>
										</pre>
									</div>
									<Tooltip
										text="Copied to clipboard!"
										position="up"
										trigger="click"
									>
										<button
											onClick={() => {
												copyToClipboard(
													JSON.stringify(txnData.extraData, null, 2)
												);
											}}
										>
											<i className="far fa-clone dark:text-ablue-100 text-ablue-500 dark:hover:text-ablue-300 hover:text-ablue-200" />
										</button>
									</Tooltip>
								</div>
							) : null}
						</section>
					)}
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
			<div className="flex  gap-x-2 ">
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
