type Txn = {
	txnHash: string;
	timeStamp: number;
	blockNumber: number;
	txnType: string;
	from: string;
	to: string;
	value: string;
};

type BlockTransactionsSuccessResponse = {
	status: 'success';
	data: {
		txns: Txn[];
	};
};

type BlockTransactionsFailureResponse = {
	status: 'failure';
	data: null;
};

export type BlockTransactionsResponse =
	| BlockTransactionsSuccessResponse
	| BlockTransactionsFailureResponse;
