import { Block } from '@/shared/models/block.model';

type Txn = {
	txnHash: string;
	from: string;
	to: string;
	timeStamp: number;
	value: string;
	blockNumber: number;
	txnType: string;
};

type LatestTransactionsSuccessResponse = {
	status: 'success';
	data: {
		averageTransactionFeePast24Hours: number;
		averageTransactionFeePercentageChangeComparedToPreviousDay: number;

		//
		totalTransactionFeesPast24Hours: number;
		totalTransactionFeesPercentageChangeComparedToPreviousDay: number;

		//
		transactionCountPast24Hours: number;
		transactionCountPercentageChangeComparedToPreviousDay: number;

		//
		transactions: Txn[];

		//
		metadata: {
			previousPage: number;
			currentPage: number;
			nextPage: number;
			totalPages: number;
			totalItems: number;
			itemsPerPage: number;
			startIndex: number;
			endIndex: number;
		};
	};
};

type LatestTransactionsFailureResponse = {
	status: 'failure';
	data: null;
};

export type LatestTransactionsResponse =
	| LatestTransactionsSuccessResponse
	| LatestTransactionsFailureResponse;
