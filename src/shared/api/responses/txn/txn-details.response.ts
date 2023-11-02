// type Txn = {};

export type TransactionDetailsSuccessResponse = {
	blockNumber: number;
	data: string;
	from: string;
	size: number;
	timeStamp: number;
	to: string;
	txnFee: string;
	txnFeeInUsd: string;
	txnHash: string;
	value: string;
	valueInUsd: string;
};

type TransactionDetailFailureResponse = {
	message: string;
};

export type TransactionDetailResponse =
	| TransactionDetailsSuccessResponse
	| TransactionDetailFailureResponse;
