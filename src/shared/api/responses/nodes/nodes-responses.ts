type Node = {
	votingPowerInPwr: number;
	earnings: number;
	address: string;
	blocksSubmitted: number;
	host: string;
	votingPowerInPercentage: number;
};

export type NodesSuccessResponse = {
	totalStandbyNodes: number;
	totalVotingPower: number;
	totalActiveNodes: number;
	nodes: Node[];
	metadata: {
		currentPage: number;
		endIndex: number;
		itemsPerPage: number;
		nextPage: number;
		previousPage: number;
		startIndex: number;
		totalItems: number;
		totalPages: number;
	};
};

type NodesFailureResponse = {
	message: string;
};

export type LatestBlocksResponse = NodesSuccessResponse | NodesFailureResponse;
