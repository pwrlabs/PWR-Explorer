type Block = {
	timeStamp: number;
	blockHeight: number;
	txnsCount: number;
	blockReward: string;
	blockSubmitter: string;
};

type LatestBlocksSuccessResponse = {
	status: 'success';
	data: {
		totalBlockRewardsPast24Hours: string;
		averageBlockSizePast24Hours: number;
		networkUtilizationPast24Hours: number;
		blocks: Block[];
	};
};

type LatestBlocksFailureResponse = {
	status: 'failure';
	data: null;
};

export type LatestBlocksResponse = LatestBlocksSuccessResponse | LatestBlocksFailureResponse;
