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
		transactions: Txn[];
		metadata: {
			totalItems: number;
			startIndex: number;
			previousPage: number;
			itemsPerPage: number;
			endIndex: number;
			nextPage: number;
			totalPages: number;
			currentPage: number;
		};
	};
};

type BlockTransactionsFailureResponse = {
	status: 'failure';
	data: null;
};

export type BlockTransactionsResponse =
	| BlockTransactionsSuccessResponse
	| BlockTransactionsFailureResponse;
