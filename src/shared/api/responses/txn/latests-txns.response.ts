import { Block } from '@/shared/models/block.model';

type Txn = {
	txnHash: string;
	from: string;
	to: string;
	timeStamp: number;
	value: string;
	blockNumber: number;
};

type LatestTransactionsSuccessResponse = {
	status: 'success';
	data: {
		transactionCountPercentageChangeComparedToPreviousDay: number;
		totalTransactionFeesPast24Hours: number;
		averageTransactionFeePercentageChangeComparedToPreviousDay: number;
		totalTransactionFeesPercentageChangeComparedToPreviousDay: number;
		averageTransactionFeePast24Hours: number;
		transactionCountPast24Hours: number;
		txns: Txn[];
	};
};

type LatestTransactionsFailureResponse = {
	status: 'failure';
	data: null;
};

export type LatestTransactionsResponse =
	| LatestTransactionsSuccessResponse
	| LatestTransactionsFailureResponse;
