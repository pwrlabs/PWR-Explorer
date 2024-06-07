/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useQuery } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';

import HeaderComponent from 'src/layout/header/header.component';
import FooterComponent from 'src/layout/footer/footer.component';
import LatestBlocksTable from 'src/components/internal/root-page/latest-blocks-table';
import LatestTxnsTable from 'src/components/internal/root-page/latest-txns-table';
import ErrorComponent from 'src/components/error/error.component';
import StatBoxSkeleton from 'src/components/skeletons/root/stat-box.skeleton';
import LatestSkeleton from 'src/components/skeletons/root/latest-tables.skeleton';

import { isAddress, isHash } from 'src/shared/utils/functions';

import QueryApi from 'src/shared/api/query-api';
import QUERY_KEYS from 'src/static/query.keys';
import ROUTES from 'src/static/router.data';

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
	// *~~*~~*~~ search bar *~~*~~*~~* //
	const { push } = useRouter();

	const formik = useFormik({
		initialValues: {
			search: '',
		},
		validationSchema: yup.object({
			search: yup
				.string()
				.test(
					'is-address-hash-or-number',
					'Search term must be an address, a hash, or a number',
					(value) =>
						isAddress(value || '') || isHash(value || '') || !isNaN(Number(value))
				),
		}),
		onSubmit: (values) => {
			const { search } = values;
			const address = isAddress(search);
			const hash = isHash(search);
			const number = !isNaN(Number(search));

			if (address) {
				// Navigate to the address page for 42-character input
				push(`${ROUTES.address}/${search}`);
			} else if (hash) {
				// Navigate to the transaction page for 66-character input
				push(`${ROUTES.transactions}/${search}`);
			} else if (number) {
				// Navigate to the block page for number input
				push(`${ROUTES.blocks}/${search}`);
			}
		},
	});

	const { values, touched, dirty, errors, handleChange, handleBlur, handleSubmit } = formik;

	// *~~*~~*~~ fetch data ~~*~~*~~* //
	const {
		isLoading: infoLoading,
		data: infoData,
		isError: infoError,
	} = useQuery([QUERY_KEYS.explorer_info], QueryApi.explorer.info, {
		staleTime: 3 * 1000,
	});

	if (infoError || (!infoLoading && !infoData)) return <ErrorComponent />;

	return (
		<>
			<HeaderComponent />

			<div className="dark:bg-abrandc-dark-blackish bg-white">
				<div className="container-2 mx-auto pt-20 pb-20">
					<div className="space-y-20">
						{/* Title */}
						<div className="flex flex-col items-center space-y-4">
							<h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold dark:text-white text-abrandc-dark-grey leading-tight p-2 text-center">
								The PWR Chain Explorer
							</h1>
							{/* Search */}
							<form onSubmit={formik.handleSubmit} className="w-full lg:w-[800px]">
								<div className="field">
									{/* input contianer */}
									<div
										className={`search-bar-container  ${formik.errors.search ? ' !border-ared-500' : ''
											}`}
									>
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
											className="search-bar-input"
											placeholder="Search by Address | Txn Hash | Block "
											// placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
											name="search"
											value={values.search}
											onChange={(e) => {
												const trimmedValue = e.target.value.trim();
												formik.setFieldValue('search', trimmedValue);
												formik.handleChange(e);
											}}
											onBlur={(e) => {
												const trimmedValue = e.target.value.trim();
												formik.setFieldValue('search', trimmedValue);
												formik.handleBlur(e);
											}}
										/>

										<button
											className="flex items-center gap-x-2"
											disabled={!dirty || !touched || !formik.isValid}
											type="submit"
										>
											<Image
												src="/media/icons/enter-arrow.svg"
												width={24}
												height={24}
												alt=""
											/>
											<div className="text-agrey-500 font-bold text-sm">
												Enter
											</div>
										</button>
									</div>
								</div>
							</form>
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
													<span>${infoData.price / 100}</span>
													<span
														className={`font-medium  pl-2 pr-2 ${infoData.priceChange > 0
															? 'text-green-500'
															: 'text-ared-400'
															}`}
													>
														{infoData.priceChange}%
													</span>
												</>
											)}
											icon="/icons/pwr.svg"
										/>

										{/* Market Cap */}
										<StatBox
											title="PWR MARKET CAP"
											valueComp={() => (
												// <>${numberWithCommas(infoData.marketCap)}</>
												<>$1,000,000,000</>
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
														{infoData.totalTransactionsCount}
													</h2>
												</div>
											</div>

											<div className="flex flex-col gap-y-2">
												<h1 className="text-agrey-600 text-sm font-medium leading-[24px] text-right">
													TPS
												</h1>
												<h2 className="text-base font-bold dark:text-white text-abrandc-dark-grey">
													{infoData.tps}
												</h2>
											</div>
										</div>

										{/* Blocks, nodes */}
										<div className="flex flex-col xl:flex-row gap-4 ">
											{/* Blocks */}
											<StatBox
												icon="/icons/clock.svg"
												title="BLOCKS"
												valueComp={() => <>{infoData.blocksCount}</>}
											/>

											{/* nodes */}
											<StatBox
												icon="/icons/nodes.svg"
												title="VALIDATOR NODES"
												valueComp={() => <>{infoData.validators}</>}
											/>
										</div>
									</>
								)}
							</div>

							{/* Graph */}
							<div className="xl:col-span-3">
								<div className="w-9/10 h-[192px] bg-abrandc-light-grey dark:bg-agrey-900 rounded-xl p-4 space-y-2">
									<h1 className="text-agrey-600 text-sm font-medium ">
										TRANSACTION HISTORY IN 14 DAYS
									</h1>

									<div className="p-4 w-full h-full  rounded-xl  flex items-center justify-center">
										{/* <Chart /> */}
										<img src="/graph.svg" alt="" />

										{/* <Image className="" src="/graph.svg" alt="" layout="fill" /> */}
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
									{infoLoading ? (
										[1, 1, 1, 1, 1].map((item, idx) => (
											<div
												key={idx}
												className={`block_box flex justify-between items-center gap-x-2 lg:gap-x-6 p-4 ${idx % 2 === 0
													? 'dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
													: ''
													}`}
											>
												<LatestSkeleton key={idx} />
											</div>
										))
									) : (
										<LatestBlocksTable blocks={infoData.blocks} />
									)}
								</div>
								<Link
									href={ROUTES.blocks}
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
									{infoLoading ? (
										[1, 2, 3, 4, 5].map((_, idx) => (
											<div
												key={idx}
												className={`txn_box flex justify-between items-center gap-x-2 lg:gap-x-6 p-4 ${idx % 2 === 0
													? 'dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
													: ''
													}`}
											>
												<LatestSkeleton key={idx} />
											</div>
										))
									) : (
										<LatestTxnsTable transactions={infoData.txns} />
									)}
								</div>

								<Link
									href={ROUTES.transactions}
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
