'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';

import TableSkeleton from 'src/components/internal/table-skeleton/table-skeleton.component';
import Tooltip from 'src/components/internal/tooltip/tooltip.component';
import Pagination from 'src/components/internal/pagination/pagination.component';
import QuickPagination from 'src/components/internal/quick-pagination/quick-pagination.component';
import ErrorComponent from 'src/components/error/error.component';
import OverviewBoxSkeleton from 'src/components/skeletons/address/overview-box.skeleton';

import { BnToDec, shortenAddress, timeAgo } from 'src/shared/utils/formatters';
import { copyToClipboard, isAddress, isHash } from 'src/shared/utils/functions';
import QueryApi from 'src/shared/api/query-api';

import QUERY_KEYS from 'src/static/query.keys';
import ROUTES from 'src/static/router.data';
import TextButton from 'src/components/internal/text-button/text-button.component';
import TransactionComponent from './transcations.component';
import BlockComponent from './blocks.component';

type AddressPageProps = {
	params: {
		address: string;
	};
};

export default function AddressPage({ params }: AddressPageProps) {
	const address = params.address;
	const { push } = useRouter();

	const [activeTab, setActiveTab] = useState('transactions');
	const [page, setPage] = useState<number>(1);
	const [count, setCount] = useState<number>(10);

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};

	// *~~*~~*~~ account balance ~~*~~*~~* //
	const {
		data: balanceData,
		isLoading: balanceLoading,
		isError: balanceError,
	} = useQuery([QUERY_KEYS.balance, address], () => QueryApi.user.balance(address), {
		staleTime: 1000 * 60 * 5,
		cacheTime: 0,
	});

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

	// *~~*~~*~~ Txn history ~~*~~*~~* //

	const {
		data: txnHistoryData,
		isLoading: txnHistoryLoading,
		isError: txnHistoryError,
	} = useQuery(
		[QUERY_KEYS.txn_history, address, page, count],
		() => QueryApi.user.txnHistory(address, page, count),
		{
			staleTime: 1000 * 60 * 5,
			cacheTime: 0,
		}
	);

	if (
		balanceError ||
		(!balanceLoading && !balanceData) ||
		txnHistoryError ||
		(!txnHistoryLoading && !txnHistoryData)
	)
		return <ErrorComponent />;

	const { values, touched, dirty, errors, handleChange, handleBlur, handleSubmit } = formik;
	return (
		<main className="container-2 mx-auto space-y-12">
			<section className="space-y-4">
				{/* Title */}
				<h1 className="text-4xl font-bold dark:text-white text-abrandc-dark-grey">
					Account
				</h1>

				<div className="flex items-center space-x-4 ">
					<h1 className="flex flex-grow sm:flex-grow-0 min-w-0">
						<div className="dark:text-white text-abrandc-dark-grey mr-2">Address</div>
						<div className="flex-grow min-w-0 overflow-hidden text-ellipsis dark:text-ablue-100 text-ablue-500">
							{address}
						</div>
						{/* <div className="dark:text-ablue-100 text-ablue-500 min-w-0 overflow-hidden flex-grow text-ellipsis w-[200px]">
							{address}
						</div> */}
					</h1>

					<Tooltip text="Copied to clipbloard" position="up" trigger="click">
						<button
							className="text-agrey-500 dark:text-agrey-600"
							onClick={() => copyToClipboard(address)}
						>
							<i className="far fa-clone" />
						</button>
					</Tooltip>
				</div>

				{/* Overview */}
				<div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
					{balanceLoading || txnHistoryLoading ? (
						<>
							<OverviewBoxSkeleton />
							<OverviewBoxSkeleton />
						</>
					) : (
						<>
							{/* Overview box */}
							<div className="  bg-abrandc-light-grey dark:bg-agrey-900 rounded-xl p-4 w-full space-y-4">
								<h1 className="text-xl font-bold dark:text-white text-abrandc-dark-grey">
									Overview
								</h1>

								{/* balance */}
								<div className="space-y-1">
									<div className="text-agrey-500 dark:text-agrey-600 text-sm font-medium">
										PWR BALANCE
									</div>
									<div className="space-x-2">
										<span className="dark:text-white text-black font-bold">
											{+BnToDec(balanceData.balance, 9, 9)} PWR
										</span>
										<span className="text-agrey-500 dark:text-agrey-600">
											<Tooltip text="lorem" position="up" trigger="hover">
												<i className="far fa-info-circle" />
											</Tooltip>
										</span>
									</div>
								</div>

								{/* Pwr value */}
								<div className="space-y-1">
									<span className="text-agrey-500 dark:text-agrey-600 text-sm font-medium">
										PWR VALUE
									</span>
									<div className="space-x-2">
										<span className="dark:text-white text-black font-bold">
											${balanceData.balanceUsdValue}
										</span>
										<span className="text-agrey-500 dark:text-agrey-600">
											(@ $1.00/PWR)
										</span>
									</div>
								</div>
							</div>

							{/* Overview box */}
							<div className="  bg-abrandc-light-grey dark:bg-agrey-900 rounded-xl p-4 w-full space-y-4">
								<h1 className="text-xl font-bold dark:text-white text-abrandc-dark-grey">
									More Info
								</h1>

								{/* Last Transaction Info */}
								<div className="space-y-1">
									<div className="text-agrey-500 dark:text-agrey-600 text-sm font-medium">
										LAST TXN SENT
									</div>
									<div className="flex gap-x-2">
										<Link
											href={`${ROUTES.transactions}/${txnHistoryData.hashOfLastTxnSent}`}
											className="text-medium text-ablue-800 dark:text-ablue-100"
										>
											{shortenAddress(txnHistoryData.hashOfLastTxnSent)}
										</Link>

										<Tooltip
											position="up"
											trigger="click"
											text="copied to clipboard"
										>
											<button
												className="text-agrey-500 dark:text-agrey-600"
												onClick={() =>
													copyToClipboard(
														txnHistoryData.hashOfLastTxnSent
													)
												}
											>
												<i className="far fa-clone "></i>
											</button>
										</Tooltip>

										<div className="text-agrey-500 dark:text-agrey-600 text-sm font-medium">
											{timeAgo(txnHistoryData.timeOfLastTxnSent)}
										</div>
									</div>
								</div>

								{/* Last txn info */}
								<div className="space-y-1">
									<span className="text-agrey-500 dark:text-agrey-600 text-sm font-medium">
										FIRST TXN SENT
									</span>
									<div className="flex gap-x-2">
										<Link
											href={`${ROUTES.transactions}/${txnHistoryData.hashOfFirstTxnSent}`}
											className="text-medium text-ablue-800 dark:text-ablue-100"
										>
											{shortenAddress(txnHistoryData.hashOfFirstTxnSent)}
										</Link>

										<Tooltip
											position="up"
											trigger="click"
											text="copied to clipboard"
										>
											<button
												className="text-agrey-500 dark:text-agrey-600"
												onClick={() =>
													copyToClipboard(
														txnHistoryData.hashOfFirstTxnSent
													)
												}
											>
												<i className="far fa-clone "></i>
											</button>
										</Tooltip>

										<div className="text-agrey-500 dark:text-agrey-600 text-sm font-medium">
											{timeAgo(txnHistoryData.timeOfFirstTxnSent)}
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</section>

			<section className="flex justify-between items-center">
				{/* Tab navigation */}
				<div className="flex ">
					<button
						onClick={() => handleTabChange('transactions')}
						className={`py-2 px-4 text-sm ${
							activeTab === 'transactions'
								? 'border-b-2 font-bold dark:border-white border-ablue-500 text-ablue-500 dark:text-white'
								: 'text-agrey-500'
						}`}
					>
						Transactions
					</button>
					<button
						onClick={() => handleTabChange('blocks')}
						className={`py-2 px-4 text-sm ${
							activeTab === 'blocks'
								? 'border-b-2 font-bold dark:border-white border-ablue-500 text-ablue-500 dark:text-white'
								: 'text-agrey-500'
						}`}
					>
						Blocks
					</button>
				</div>
				<div>
					<form onSubmit={handleSubmit} className="w-full lg:w-[325px]">
						<div className="field">
							{/* input contianer */}
							<div
								className={`search-bar-nav-container  ${
									errors.search ? ' !border-ared-500' : ''
								}`}
							>
								<button
									className="flex items-center gap-x-2"
									disabled={!dirty || !touched || !formik.isValid}
									type="submit"
								>
									<i className="fa-regular fa-magnifying-glass text-agrey-500"></i>
								</button>
								<input
									className="search-bar-nav-input"
									// placeholder="Search by Address | Txn Hash | Block "
									placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
									name="search"
									value={values.search}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</div>
						</div>
					</form>
				</div>
			</section>

			{/* Tab content */}
			<div className="mt-4">
				{activeTab === 'transactions' ? (
					<TransactionComponent
						key="transactions"
						address={address}
						page={page}
						setPage={setPage}
						count={count}
						setCount={setCount}
					/>
				) : (
					<BlockComponent
						key="blocks"
						address={address}
						page={page}
						setPage={setPage}
						count={count}
						setCount={setCount}
					/>
				)}
			</div>
		</main>
	);
}
