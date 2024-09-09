// type Txn = {};

export type TransactionDetailsSuccessResponse = {
	txnHash: string;
	timeStamp: number;
	valueInUsd: string;
	size: number;
	data: string;
	blockNumber: number;
	txnType: string;
	from: string;
	to: string;
	txnFeeInUsd: string;
	txnFee: string;
	value: string;
	success: boolean;
	errorMessage: string;
	extraData: Object;
};

type TransactionDetailFailureResponse = {
	message: string;
};

export type TransactionDetailResponse =
	| TransactionDetailsSuccessResponse
	| TransactionDetailFailureResponse;
