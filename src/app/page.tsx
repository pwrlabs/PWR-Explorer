'use client';

import 'src/components/internal/text-field/text-field.scss';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import HeaderComponent from 'src/layout/header/header.component';
import FooterComponent from 'src/layout/footer/footer.component';

import { BnToDec, numberWithCommas, shortenAddress, timeAgo } from 'src/shared/utils/formatters';

import { useQuery } from 'react-query';
import QueryApi from 'src/shared/api/query-api';
import QUERY_KEYS from 'src/static/query.keys';
import ROUTES from '@/static/router.data';

function BlockBoxSkeleton() {
	return (
		<div className="flex items-center gap-x-8 skeleton-container h-full w-full">
			<div className="skeleton-circle !h-[32px] w-[32px] !mb-0"></div>

			<div className="flex-grow">
				<div className="skeleton-title max-w-[200px]"></div>
				<div className="skeleton-line max-w-[150px] !mb-0"></div>
				<span className="sr-only">Loading...</span>
			</div>

			<div className="flex-grow">
				<div className="skeleton-title max-w-[170px]"></div>
				<div className="skeleton-line max-w-[50px] !mb-0"></div>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}

function StatBoxSkeleton() {
	return (
		<div className=" bg-abrandc-light-grey dark:bg-agrey-900 w-full h-[88px] rounded-xl p-4">
			<div className="flex items-center gap-x-4 skeleton-container h-full">
				<div className="skeleton-circle !h-[28px] w-[28px] !mb-0"></div>

				<div className="flex-grow">
					<div className="skeleton-title max-w-[150px]"></div>
					<div className="skeleton-line max-w-[100px]"></div>
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		</div>
	);
}

function StatBox({ title, valueComp, icon }: { title: string; valueComp: any; icon: any }) {
	return (
		<div className="flex items-center gap-x-4 bg-abrandc-light-grey dark:bg-agrey-900 rounded-xl p-4 w-full">
			<Image src={icon} width={28} height={28} alt="PWR Icon" />
			<div className="flex flex-col gap-y-2">
				<h1 className="text-agrey-600 text-sm font-medium leading-[24px]">{title}</h1>
				<h2 className="text-base font-bold dark:text-white text-abrandc-dark-grey">
					{valueComp()}
				</h2>
			</div>
		</div>
	);
}

export default function Home() {
	const {
		isLoading: infoLoading,
		data: infoData,
		isError: infoError,
	} = useQuery([QUERY_KEYS.explorer_info], QueryApi.explorer.info);

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
								{/* <div className="">
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
								</div> */}
								<input
									className="text-field !h-[64px] !rounded-2xl "
									placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
								/>
							</div>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-1 xl:grid-cols-12 gap-4 ">
							{/* Pwr price and market cap  */}
							<div className="xl:col-span-4 space-y-4">
								{infoLoading ? (
									<>
										<StatBoxSkeleton />
										<StatBoxSkeleton />
									</>
								) : (
									<>
										{/* Price */}
										<StatBox
											title="PWR PRICE"
											valueComp={() => (
												<>
													<span>${infoData?.data?.price}</span>
													<span
														className={`font-medium  pl-2 pr-2 ${
															infoData?.data &&
															infoData?.data?.priceChange > 0
																? 'text-green-500'
																: 'text-ared-400'
														}`}
													>
														{infoData?.data?.priceChange}%
													</span>
												</>
											)}
											icon="/icons/pwr.svg"
										/>

										{/* Market Cap */}
										<StatBox
											title="PWR MARKET CAP"
											valueComp={() => (
												<>
													$
													{numberWithCommas(
														infoData?.data?.marketCap || 0
													)}
												</>
											)}
											icon="/icons/globe.svg"
										/>
									</>
								)}
							</div>

							{/* Transactions, blocks, nodes */}
							<div className="xl:col-span-5 space-y-4">
								{infoLoading ? (
									<>
										<StatBoxSkeleton />
										<div className="flex gap-x-4">
											<StatBoxSkeleton />
											<StatBoxSkeleton />
										</div>
									</>
								) : (
									<>
										{/* Transactions */}
										<div className="flex items-center justify-between bg-abrandc-light-grey dark:bg-agrey-900 rounded-xl p-4 w-full">
											<div className="flex items-center gap-x-4">
												<Image
													src="/icons/arrows.svg"
													width={28}
													height={28}
													alt="PWR Icon"
												/>
												<div className="flex flex-col gap-y-2">
													<h1 className="text-agrey-600 text-sm font-medium leading-[24px] ">
														TRANSACTIONS
													</h1>
													<h2 className="text-base font-bold dark:text-white text-abrandc-dark-grey">
														{infoData?.data?.totalTransactionsCount}
													</h2>
												</div>
											</div>

											<div className="flex flex-col gap-y-2">
												<h1 className="text-agrey-600 text-sm font-medium leading-[24px] text-right">
													TPS
												</h1>
												<h2 className="text-base font-bold dark:text-white text-abrandc-dark-grey">
													{infoData?.data?.tps}
												</h2>
											</div>
										</div>

										{/* Blocks, nodes */}
										<div className="flex flex-col xl:flex-row gap-4 ">
											{/* Blocks */}
											<StatBox
												icon="/icons/clock.svg"
												title="BLOCKS"
												valueComp={() => <>{infoData?.data?.blocksCount}</>}
											/>

											{/* nodes */}
											<StatBox
												icon="/icons/nodes.svg"
												title="VALIDATOR NODES"
												valueComp={() => <>{infoData?.data?.validators}</>}
											/>
										</div>
									</>
								)}
							</div>

							{/* Graph */}
							<div className="xl:col-span-3">
								<div className="flex flex-col p-4 w-full h-[192px] bg-abrandc-light-grey dark:bg-agrey-900 rounded-xl">
									<h1 className="text-agrey-600 text-sm font-medium">
										TRANSACTION HISTORY IN 14 DAYS
									</h1>

									<div className="flex-grow flex flex-col justify-end">
										<div className="w-full ">
											<img src="/graph.svg" alt="" className="xl:w-full" />
											{/* <Image
											className="xl:w-[300px] h-[85px] w-full"
											src="/graph.svg"
											width={10}
											height={10}
											alt=""
										/> */}
											{/* <div className="flex justify-between items-center mx-1 text-sm text-agrey-600">
											<span>Apr 23</span>
											<span>Apr 30</span>
											<span>May 7</span>
										</div> */}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Latest blocks & txns */}
						<div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-5">
							{/* Latest Blocks */}
							<div className="latest_blocks">
								<h1 className="dark:text-white text-abrandc-dark-grey text-2xl font-medium leading-[36px] mb-3">
									Latest Blocks
								</h1>

								<div className="rounded-lg overflow-hidden">
									{infoLoading
										? [1, 2, 3, 4, 5].map((item, idx) => (
												<div
													key={idx}
													className={`block_box flex justify-between items-center gap-x-2 lg:gap-x-6 p-4 ${
														idx % 2 === 0
															? 'dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
															: ''
													}`}
												>
													<BlockBoxSkeleton key={idx} />
												</div>
										  ))
										: infoData?.data?.blocks.map((block, index) => (
												<div
													key={index}
													className={`block_box flex justify-between items-center gap-x-2 lg:gap-x-6 p-4 ${
														index % 2 === 0
															? 'dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
															: ''
													}`}
												>
													{/* icon and block number, timestamp */}
													<div className="flex gap-x-4 ">
														<Image
															className=" xl:block hidden"
															src="/icons/block.svg"
															width={32}
															height={32}
															alt=""
														/>
														<div className="space-y-2">
															{/* block number */}
															<Link
																href={`${ROUTES.blocks}/${block.blockHeight}`}
																className="font-medium pr-2 dark:text-ablue-300 text-ablue-200"
															>
																{block.blockHeight}
															</Link>
															<h1 className="text-sm dark:text-white text-abrandc-dark-grey pr-2">
																{timeAgo(block.timeStamp)}
															</h1>
														</div>
													</div>

													{/* txn count and fee recipient */}
													<div>
														<h1 className="">
															<span className="dark:text-white text-abrandc-dark-grey hidden xl:inline-block mr-2">
																Fee Recipient
															</span>
															<Link
																href={`${ROUTES.address}/${block.blockSubmitter}`}
																className="dark:text-ablue-300 text-ablue-200 font-medium "
															>
																{shortenAddress(
																	block.blockSubmitter,
																	4
																)}
															</Link>
														</h1>

														<div className="flex justify-between">
															<Link
																href={`${ROUTES.blockTxns(
																	block.blockHeight
																)}`}
																className="font-medium dark:text-ablue-300 text-ablue-200"
															>
																{block.txnsCount} txns
															</Link>
														</div>
													</div>

													{/* block fee */}
													<div className="w-[120px]">
														<h1 className="dark:bg-agrey-800 bg-ghostly_grey-50 rounded-lg dark:text-white text-abrandc-dark-grey text-sm py-1 px-2 text-center">
															{BnToDec(block.blockReward, 9, 9)} PWR
														</h1>
													</div>
												</div>
										  ))}
								</div>
								<Link
									href="#"
									className="flex items-center justify-center gap-x-2 font-medium dark:text-white text-abrandc-dark-grey leading-[26px] mt-3.5"
								>
									<span>VIEW ALL BLOCKS</span>
									<span>
										<i className="fas fa-arrow-right"></i>
									</span>
								</Link>
							</div>

							{/* Latest Transactions */}
							<div className="latest_txns">
								<h1 className="dark:text-white text-abrandc-dark-grey text-2xl font-medium leading-[36px] mb-3">
									Latest Transactions
								</h1>

								<div className="rounded-lg overflow-hidden">
									{infoLoading
										? [1, 2, 3, 4, 5].map((item, idx) => (
												<div
													key={idx}
													className={`txn_box flex justify-between items-center gap-x-2 lg:gap-x-6 p-4 ${
														idx % 2 === 0
															? 'dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
															: ''
													}`}
												>
													<BlockBoxSkeleton key={idx} />
												</div>
										  ))
										: infoData?.data?.txns.map((transaction, index) => (
												<div
													key={index}
													className={`txn_box flex justify-between items-center gap-x-2 lg:gap-x-6 p-4 ${
														index % 2 === 0
															? 'dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
															: ''
													}`}
												>
													{/* icon and txn hash, timestamp */}
													<div className="flex gap-x-4 ">
														<Image
															className=" xl:block hidden"
															src="/icons/list.svg"
															width={32}
															height={32}
															alt=""
														/>
														<div className="space-y-2">
															{/* block number */}
															<Link
																href={`${ROUTES.transactions}/${transaction.txnHash}`}
																className="font-medium pr-2 dark:text-ablue-300 text-ablue-200"
															>
																{shortenAddress(
																	transaction.txnHash,
																	4
																)}
															</Link>
															<h1 className="text-sm dark:text-white text-abrandc-dark-grey pr-2">
																{timeAgo(transaction.timeStamp)}
															</h1>
														</div>
													</div>

													{/* txn count and fee recipient */}
													<div className="fleax-grow">
														<h1 className="flex gap-x-2">
															<div className="dark:text-white text-abrandc-dark-grey">
																From
															</div>
															<Link
																href={`${ROUTES.address}/${transaction.from}`}
																className="font-medium dark:text-ablue-300 text-ablue-200 pl-1"
															>
																{shortenAddress(
																	transaction.from,
																	4
																)}
															</Link>
														</h1>

														<h1>
															<span className="dark:text-white text-abrandc-dark-grey">
																To
															</span>
															<span className="dark:text-ablue-100 text-ablue-500 font-medium pl-8">
																	{transaction.to.length > 15
																		? shortenAddress(
																				transaction.to
																		  )
																		: transaction.to}
															</span>
														</h1>
													</div>

													{/* block fee */}
													<div className="w-[100px]">
														<h1 className="dark:bg-agrey-800 bg-ghostly_grey-50 rounded-lg dark:text-white text-abrandc-dark-grey text-sm py-1 px-2 text-center">
															{BnToDec(transaction.value, 9, 9)} PWR
														</h1>
													</div>
												</div>
										  ))}
								</div>

								<Link
									href="#"
									className="flex items-center justify-center gap-x-2 font-medium dark:text-white text-abrandc-dark-grey leading-[26px] mt-3.5"
								>
									<span>VIEW ALL TRANSACTIONS</span>

									<span>
										<i className="fas fa-arrow-right"></i>
									</span>
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
