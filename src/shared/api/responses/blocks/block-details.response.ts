type Txn = {
	txnHash: string;
	timeStamp: number;
	blockNumber: number;
	txnType: string;
	from: string;
	to: string;
	value: string;
};

type BlockDetailsSuccessResponse = {
	status: 'success';
	data: {
		timeStamp: number;
		blockConfirmations: number;
		blockHeight: number;
		txnsCount: number;
		blockReward: string;
		blockSize: number;
		blockSubmitter: string;
	};
};

type BlockDetailsFailureResponse = {
	status: 'failure';
	data: null;
};

export type BlockDetailsResponse = BlockDetailsSuccessResponse | BlockDetailsFailureResponse;
