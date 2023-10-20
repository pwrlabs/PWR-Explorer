'use client';

import 'src/components/internal/text-field/text-field.scss';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import HeaderComponent from '@/layout/header/header.component';
import FooterComponent from '@/layout/footer/footer.component';

import { useQuery } from 'react-query';
import QueryApi from '@/shared/api/query-api';

export default function Home() {
	const [latestBlocks, setLatestBlocks] = useState([]);
	const [latestTxns, setLatestTxns] = useState([]);
	const blocksQuery = useQuery(['blocks'], () => QueryApi.blocks.latests(5), {
		onSuccess: (data) => {
			setLatestBlocks(data?.data.data.blocks);
		},
	});
	const expolrerInfo = useQuery(['expolrerInfo'], () => QueryApi.explorer.info());
	// const bloclkDetails = useQuery(['blockDetails'], () => QueryApi.blocks.details(1));
	const allTxn = useQuery(['allTxn'], () => QueryApi.blocks.allTxn(5));
	console.log('allTxn', allTxn.data);
	console.log('blocksQuery', blocksQuery.data?.data.data.blocks);
	const blocks = useQuery(['blocks'], () => QueryApi.blocks.latests(5));
	console.log('blocks', blocks.data?.data.data.blocks[0].timeStamp);

	// const txnDetails = useQuery(['txnDetails'], () => QueryApi.transcations.details("242ba788d834106fc192abdc64c6bac42e3b00bd29564aefc39058efd3071abc"));
	// console.log('txnDetails', txnDetails.data);
	const latestTxn = useQuery(['latestTxn'], () => QueryApi.transcations.latest(5), {
		onSuccess: (data) => {
			setLatestTxns(data?.data.data.txns);
		},
	});
	console.log('latestTxn', latestTxn.data?.data.data.txns);
	console.log('dataaaaa', latestBlocks);

	// console.log('bloclkDetails', bloclkDetails.data.data.data.timeStamp);
	// console.log('explorer info', expolrerInfo.data);
	// console.log('blocks query', blocksQuery.data);

	return (
		<>
			<HeaderComponent />

			<div className="dark:bg-abrandc-dark-blackish bg-white">
				<div className="container-2 mx-auto pt-20 pb-20">
					<div className="space-y-20">
						{/* Title */}
						<div className="flex flex-col items-center space-y-4">
							<h1 className="text-[56px] font-bold dark:text-white text-abrandc-dark-grey text leading-[68px] p-2 text-center">
								The PWR Chain Explorer
							</h1>
							{/* Search */}
							<div className="field lg:w-[800px] w-full relative">
								{/* Filter */}
								<div className="absolute left-6 top-[16px]">
									<button className="flex items-center gap-x-2 dark:bg-agrey-900 bg-abrandc-light-grey rounded-[8px] px-2 py-1 dark:text-white text-xl font-medium">
										<span>All Filters</span>
										<Image
											className="w-auto h-auto"
											src="/icons/arrow-down.svg"
											width={20}
											height={20}
											alt=""
										/>
									</button>
								</div>
								<input
									className="text-field !h-[64px] !rounded-[16px] !pl-44"
									placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
								/>
							</div>
						</div>

						{/* Stats */}
						<div className="flex xl:flex-row flex-col gap-x-4 gap-y-4">
							{/* Pwr price and market cap  */}
							<div className="flex flex-col gap-y-4 xl:w-full">
								{/* Price */}
								{expolrerInfo.isLoading ? (
									<div>Loading...</div>
								) : expolrerInfo.error ? (
									<div>Error:</div>
								) : (
									<>
										<div className="flex items-center gap-x-4 dark:bg-agrey-900 rounded-[12px] p-4 w-full  bg-abrandc-light-grey">
											<Image
												className="w-auto h-auto"
												src="/icons/pwr.svg"
												width={20}
												height={20}
												alt="PWR Icon"
											/>
											<div className="flex flex-col gap-y-2">
												<h1 className="text-agrey-600 text-xl font-medium leading-[24px]">
													PWR PRICE
												</h1>
												<h2 className="text-base font-bold dark:text-white text-abrandc-dark-grey">
													${expolrerInfo.data?.data?.data?.price}
													<span className="font-medium text-ared-400 pl-2 pr-2">
														(
														{expolrerInfo.data?.data?.data?.priceChange}
														%)
													</span>
												</h2>
											</div>
										</div>

										<div className="flex items-center  gap-x-4 dark:bg-agrey-900 rounded-[12px] p-4 w-full  bg-abrandc-light-grey">
											<Image
												className="w-auto h-auto"
												src="/icons/globe.svg"
												width={20}
												height={20}
												alt="Market Cap Icon"
											/>
											<div className="flex flex-col gap-y-2">
												<h1 className="text-agrey-600 text-xl font-medium leading-[24px]">
													PWR MARKET CAP
												</h1>
												<h2 className="text-base font-bold dark:text-white text-abrandc-dark-grey">
													${expolrerInfo.data?.data?.data?.marketCap}
												</h2>
											</div>
										</div>
									</>
								)}
							</div>

							{/* Transactions, blocks, nodes */}
							<div className="flex flex-col gap-y-4 w-full">
								{/* Transactions */}
								<div className="flex items-center gap-x-4 dark:bg-agrey-900 rounded-[12px] p-4 w-full bg-abrandc-light-grey">
									<Image
										className="w-auto h-auto"
										src="/icons/transactions.svg"
										width={20}
										height={20}
										alt=""
									/>
									<div className="flex flex-col gap-y-2 w-full">
										<div className="flex justify-between items-center text-agrey-600 text-xl font-medium leading-[24px]">
											<h1>TRANSACTIONS</h1>
											<h1>TPS</h1>
										</div>
										<div className="flex justify-between items-center text-base font-bold dark:text-white text-abrandc-dark-grey">
											<h2>
												{
													expolrerInfo.data?.data?.data
														?.totalTransactionsCount
												}{' '}
												M
											</h2>
											<h2>{expolrerInfo.data?.data?.data?.tps}</h2>
										</div>
									</div>
								</div>
								{/* Blocks, nodes */}
								<div className="flex flex-col xl:flex-row gap-x-4 w-full gap-y-4">
									{/* Blocks */}
									<div className="flex flex-1 items-center gap-x-4 dark:bg-agrey-900 bg-abrandc-light-grey rounded-[12px] p-4 xl:w-[195px] h-[88px]">
										<Image
											className="w-auto h-auto"
											src="/icons/clock.svg"
											width={20}
											height={20}
											alt=""
										/>
										<div className="flex flex-col gap-y-2">
											<h1 className="text-agrey-600 text-xl font-medium leading-[24px]">
												BLOCKS
											</h1>
											<h2 className="text-base font-bold dark:text-white text-abrandc-dark-grey">
												{expolrerInfo.data?.data?.data?.blocksCount}
											</h2>
										</div>
									</div>
									{/* Nodes */}
									<div className="flex flex-1 items-center gap-x-4 dark:bg-agrey-900 bg-abrandc-light-grey rounded-[12px] py-4 px-3 xl:w-[195px]  h-[88px]">
										<Image
											className="w-auto h-auto"
											src="/icons/nodes.svg"
											width={20}
											height={20}
											alt=""
										/>
										<div className="flex flex-col gap-y-2">
											<h1 className="text-agrey-600 text-xl font-medium leading-[24px]">
												VALIDATOR NODES
											</h1>
											<h2 className="text-base font-bold dark:text-white text-abrandc-dark-grey">
												{expolrerInfo.data?.data?.data?.validators}
											</h2>
										</div>
									</div>
								</div>
							</div>

							{/* Graph */}
							<div className="flex flex-col gap-y-4 border rounded-xl p-4 w-full h-[192px]">
								<h1 className="text-agrey-600 text-xl font-medium">
									TRANSACTION HISTORY IN 14 DAYS
								</h1>
								<div className="flex gap-x-2 font-medium text-xl text-agrey-600 items-end">
									<span className="translate-y-[-20px]">840k</span>
									<div className="flex flex-col gap-y-1">
										<Image
											className="xl:w-[300px] h-[85px] w-full"
											src="/graph.svg"
											width={10}
											height={10}
											alt=""
										/>
										<div className="flex justify-between items-center mx-1">
											<span>Apr 23</span>
											<span>Apr 30</span>
											<span>May 7</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Latest */}
						<div className="flex xl:flex-row flex-col gap-x-8 gap-y-5">
							{/* Latest Blocks */}
							<div className="flex flex-col w-full">
								<h1 className="dark:text-white text-abrandc-dark-grey text-2xl font-medium leading-[36px] mb-3">
									Latest Block
								</h1>
								{latestBlocks.map((block, index) => (
									<div
										key={index}
										className={`flex gap-x-2 lg:gap-x-6 items-center rounded-[8px] py-3 px-4 ${
											index % 2 === 0
												? 'dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
												: ''
										}`}
									>
										<Image
											className="w-auto h-auto xl:block hidden"
											src="/icons/block.svg"
											width={20}
											height={20}
											alt=""
										/>
										<div className="flex flex-col xl:flex-row lg:justify-between xl:justify-start items-start xl:items-center gap-x-4 w-full dark:text-ablue-300 text-ablue-200">
											<div className="flex flex-row xl:flex-col gap-y-2 gap-x-4 justify-center items-center ">
												<h1 className="font-medium pr-2 ">
													{block.blockHeight}
												</h1>
												<h1 className="font-medium text-xl dark:text-white text-abrandc-dark-grey pr-2">
													{block.timeStamp}
												</h1>
											</div>
											<div className="flex flex-col">
												<h1 className="dark:text-white text-abrandc-dark-grey">
													Fee Recipient
													<span className="dark:text-ablue-300 text-ablue-200 font-medium pl-2">
														rsync-build
													</span>
												</h1>
												<h1 className="font-medium">
													{block.txnsCount} txns
												</h1>
											</div>
											<div className="flex flex-col gap-y-2">
												<h1 className="dark:bg-agrey-800 bg-ghostly_grey-50 rounded-[8px] dark:text-white text-abrandc-dark-grey text-xl py-1 px-2">
													{block.blockReward} PWR
												</h1>
											</div>
										</div>
									</div>
								))}
								<Link
									href="#"
									className="flex items-center justify-center gap-x-2 font-medium dark:text-white text-abrandc-dark-grey leading-[26px] mt-3.5"
								>
									<span>VIEW ALL BLOCKS</span>
									<Image
										className=""
										src="/icons/arrow-down.svg"
										width={24}
										height={24}
										alt=""
									/>
								</Link>
							</div>

							{/* Latest Transactions */}
							<div className="flex flex-col w-full">
								<h1 className="dark:text-white text-abrandc-dark-grey text-2xl font-medium leading-[36px] mb-3">
									Latest Transactions
								</h1>
								{latestTxns.map((transaction, index) => (
									<div
										key={index}
										className={`flex gap-x-2 lg:gap-x-6 items-center rounded-[8px] py-3 px-4 ${
											index % 2 === 0
												? 'dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
												: ''
										}`}
									>
										<Image
											className="w-auto h-auto xl:block hidden"
											src="/icons/list.svg"
											width={20}
											height={20}
											alt=""
										/>
										<div className="flex flex-col xl:flex-row lg:justify-between xl:justify-start items-start xl:items-center gap-x-4 w-full dark:text-ablue-300 text-ablue-200">
											<div className="flex flex-row xl:flex-col gap-y-2 gap-x-4 justify-center items-center ">
												<h1 className="font-medium pr-2">
													{transaction.txnHash.substring(0, 7)}...
												</h1>
												<h1 className="font-medium text-xl dark:text-white text-abrandc-dark-grey pr-2">
													{transaction.timeStamp}
												</h1>
											</div>
											<div className="flex flex-col  ">
												<h1 className="dark:text-white text-abrandc-dark-grey mr-2">
													From
													<span className="font-medium dark:text-ablue-300 text-ablue-200 pl-1">
														{transaction.from.substring(0, 7)}...
													</span>
												</h1>
												<h1 className="dark:text-white text-abrandc-dark-grey">
													To
													<span className="dark:text-ablue-100 text-ablue-500 font-medium pl-1">
														{transaction.to.substring(0, 7)}...
													</span>
												</h1>
											</div>
											<div className="flex flex-col gap-y-2">
												<h1 className="dark:bg-agrey-800 bg-ghostly_grey-50 rounded-[8px] dark:text-white text-abrandc-dark-grey text-xl py-1 px-2">
													{transaction.value} PWR
												</h1>
											</div>
										</div>
									</div>
								))}
								<Link
									href="#"
									className="flex items-center justify-center gap-x-2 font-medium dark:text-white text-abrandc-dark-grey leading-[26px] mt-3.5"
								>
									<span>VIEW ALL TRANSACTIONS</span>
									<Image
										className=""
										src="/icons/arrow-down.svg"
										width={24}
										height={24}
										alt=""
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<FooterComponent />
		</>
	);
}
