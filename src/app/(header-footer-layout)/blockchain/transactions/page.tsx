'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BsArrowRightShort } from 'react-icons/bs';
import { useQuery } from 'react-query';
import QueryApi from '@/shared/api/query-api';
import { useState } from 'react';

export default function Transactions() {
	const [allTxns, setAllTxns] = useState([]);
	const latestTxn = useQuery(['latestTxn'], () => QueryApi.transcations.latest(10), {
		onSuccess: (data) => {
			setAllTxns(data?.data.data.txns);
		},
	});

	console.log('latestTxn', latestTxn.data?.data.data);

	return (
		<div className="container-2 mx-auto">
			<div className="space-y-20">
				<section className="space-y-4">
					{/* Title */}
					<h1 className="text-4xl font-bold dark:text-white text-abrandc-dark-grey px-2 py-1">
						Transactions
					</h1>
					<div className="flex xl:flex-row flex-col gap-y-4 items-center gap-x-4">
						{/* Transactions */}
						<div className="flex items-center gap-x-4 dark:bg-agrey-900 bg-abrandc-light-grey rounded-[12px] p-4 w-full">
							<Image
								className="w-auto h-auto px-2.5"
								src="/icons/transactions.svg"
								width={20}
								height={20}
								alt=""
							/>
							<div className="flex flex-col gap-y-2">
								<h1 className="font-medium text-agrey-600 text-sm">
									TRANSACTIONS (24H) PWR
								</h1>
								<h2 className="dark:text-white text-abrandc-dark-grey font-bold">
									{latestTxn.data?.data.data.transactionCountPast24Hours}
									<span className="text-[#00F696] font-normal pl-2">
										( {latestTxn.data?.data.data.transactionCountPercentageChangeComparedToPreviousDay}%)
									</span>
								</h2>
							</div>
						</div>

						{/* Transactions Fee */}
						<div className="flex items-center gap-x-4 dark:bg-agrey-900 bg-abrandc-light-grey rounded-[12px] p-4 w-full">
							<Image
								className="w-auto h-auto px-2.5"
								src="/icons/pwr.svg"
								width={20}
								height={20}
								alt=""
							/>
							<div className="flex flex-col gap-y-2">
								<h1 className="font-medium text-agrey-600 text-sm">
									TRANSACTION FEE (24h)
								</h1>
								<h2 className="dark:text-white text-abrandc-dark-grey font-bold">
									{latestTxn.data?.data.data.transactionCountPast24Hours} PWR
									<span className="text-abrandc-dark-red font-normal pl-2">
										(
										{
											latestTxn.data?.data.data
												.totalTransactionFeesPercentageChangeComparedToPreviousDay
										}
										%)
									</span>
								</h2>
							</div>
						</div>

						{/* Avg Transactions Fee */}
						<div className="flex items-center gap-x-4 dark:bg-agrey-900 bg-abrandc-light-grey  rounded-[12px] p-4 w-full h-[88px]">
							<Image
								className="w-auto h-auto px-2.5"
								src="/icons/transactions.svg"
								width={20}
								height={20}
								alt=""
							/>
							<div className="flex flex-col gap-y-2">
								<h1 className="font-medium text-agrey-600 text-sm">
									AVG. TRANSACTION FEE (24h)
								</h1>
								<h2 className="dark:text-white text-abrandc-dark-grey font-bold">
									{latestTxn.data?.data.data.averageTransactionFeePast24Hours} USD
									<span className="text-abrandc-dark-red font-normal pl-2">
										(
										{
											latestTxn.data?.data.data
												.averageTransactionFeePercentageChangeComparedToPreviousDay
										}
										%)
									</span>
								</h2>
							</div>
						</div>
					</div>
				</section>

				{/* Table */}
				<section className="overflow-x-auto">
					<div className="flex justify-between items-center">
						<div className="dark:text-white text-abrandc-dark-grey font-medium">
							<h1 className="leading-[26px] px-2 py-1">
								More than 1,381,417,561 transactions found
							</h1>
							<h2 className="text-xs px-2 py-1">(Showing the last 500k records)</h2>
						</div>
						<div className="flex items-center gap-x-2 text-white">
							<h3 className="">First</h3>
							<h3 className="">Last</h3>
						</div>
					</div>

					{/* Table */}
					<div className="w-full mt-5 overflow-x-auto">
						{/* hr */}

						<div className="flex items-center gap-x-2 text-white text-sm font-bold h-[48px] px-3">
							<Image
								className="w-auto h-auto invisible"
								src="/icons/eye.svg"
								width={20}
								height={20}
								alt=""
							/>
							<div className="flex items-center justify-center xl:w-[140px] w-[200px] xl:px-0 px-16">
								<h1 className="px-2 dark:text-white text-abrandc-dark-grey">
									Txn Hash
								</h1>
								<Image
									className="w-auto h-auto"
									src="/icons/info-circle.svg"
									width={20}
									height={20}
									alt=""
								/>
							</div>
							<div className="flex items-center justify-center w-[176px] xl:px-0 px-16">
								<h1 className="px-2 dark:text-white text-abrandc-dark-grey">
									Status
								</h1>
								<Image
									className="w-auto h-auto"
									src="/icons/info-circle.svg"
									width={20}
									height={20}
									alt=""
								/>
							</div>
							<div className="flex items-center justify-center w-[176px] xl:px-0 px-16">
								<h1 className="px-2 dark:text-white text-abrandc-dark-grey">
									Block
								</h1>
								<Image
									className="w-auto h-auto"
									src="/icons/info-circle.svg"
									width={20}
									height={20}
									alt=""
								/>
							</div>
							<div className="flex items-center justify-center w-[176px] xl:px-0 px-16">
								<h1 className="px-2 dark:text-white text-abrandc-dark-grey">
									Timestamp
								</h1>
								<Image
									className="w-auto h-auto"
									src="/icons/info-circle.svg"
									width={20}
									height={20}
									alt=""
								/>
							</div>
							<div className="flex items-center justify-center w-[188px] xl:px-0 px-16">
								<h1 className="px-2 dark:text-white text-abrandc-dark-grey">
									From
								</h1>
								<Image
									className="w-auto h-auto"
									src="/icons/info-circle.svg"
									width={20}
									height={20}
									alt=""
								/>
							</div>
							<div className="flex items-center justify-center w-[188px] xl:px-0 px-16">
								<h1 className="px-2 dark:text-white text-abrandc-dark-grey">To</h1>
								<Image
									className="w-auto h-auto"
									src="/icons/info-circle.svg"
									width={20}
									height={20}
									alt=""
								/>
							</div>
							<div className="flex items-center justify-center w-[176px] xl:px-0 px-16">
								<h1 className="px-2 dark:text-white text-abrandc-dark-grey">
									Value
								</h1>
								<Image
									className="w-auto h-auto"
									src="/icons/info-circle.svg"
									width={20}
									height={20}
									alt=""
								/>
							</div>
						</div>

						{/* rows */}
            {allTxns.map((txn, index) => (
							<div
								className={`flex items-center gap-x-2 font-medium h-[90px] p-3 rounded-[8px] w-full${
									index % 2 == 0
										? ' dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
										: 'bg-transparent'
								}`}
								key={index}
							>
								<Image
									className="w-auto h-auto"
									src="/icons/eye.svg"
									width={20}
									height={20}
									alt=""
								/>
								<Link
									href="/blockchain/transactions/details"
									className="w-[130px] xl:px-0 px-16"
								>
									<h1 className="dark:text-ablue-300 text-ablue-200">
                  {txn.txnHash.substring(0, 7)}...
									</h1>
								</Link>
								<div className="text-center w-[178px] xl:px-0 px-16">
									<h1 className="dark:text-white text-abrandc-dark-grey font-normal xl:px-0 px-8">
										Success
									</h1>
								</div>
								<div className="text-center w-[178px] xl:px-0 px-24">
									<h1 className="dark:text-ablue-300 text-ablue-200">{txn.blockNumber}</h1>
								</div>
								<div className="text-center w-[178px] xl:px-0 px-24">
									<h1 className="dark:text-white text-abrandc-dark-grey font-normal">
										{txn.timeStamp}
									</h1>
								</div>
								<div className="flex items-center justify-center gap-x-2 w-[188px] xl:px-0 pl-44">
									<h1 className="dark:text-ablue-100 text-ablue-500">
									{txn.from.substring(0, 7)}...
									</h1>
									<Image
										className="w-auto h-auto xl:px-0 px-16"
										src="/icons/copy.svg"
										width={20}
										height={20}
										alt=""
									/>
								</div>
								<div className="w-6 h-6 mx-2 bg-violet-100 dark:bg-agrey-800 rounded-full flex justify-center items-center">
									<BsArrowRightShort
										size={30}
										className="text-agrey-500 dark:text-agrey-600"
									/>
								</div>

								<div className="flex items-center justify-center gap-x-2 w-[188px] xl:px-0 px-16">
									<h1 className="dark:text-ablue-100 text-ablue-500">
                  {txn.to.substring(0, 7)}...
									</h1>
									<Image
										className="w-auto h-auto"
										src="/icons/copy.svg"
										width={20}
										height={20}
										alt=""
									/>
								</div>
								<div className="text-center w-[178px]">
									<h1 className="dark:text-white text-abrandc-dark-grey font-normal">
										{txn.value} PWR
									</h1>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
