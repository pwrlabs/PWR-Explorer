type Txn = {
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

type TransactionDetailsSuccessResponse = {
	status: 'success';
	data: Txn;
};

type TransactionDetailFailureResponse = {
	status: 'failure';
	data: null;
};

export type TransactionDetailResponse =
	| TransactionDetailsSuccessResponse
	| TransactionDetailFailureResponse;
