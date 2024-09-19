// "firstLastTransactions": {
//         "lastTransaction": {
//             "txnHash": "0xf622416334cd23d4568e6dd9071cef3254aecf6f7c5453c3700f39a384bf4fd7",
//             "timeStamp": 1725626118,
//             "block": 536073
//         },
//         "firstTransaction": {
//             "txnHash": "0x765d3afc94bf2357743bff04386b69fb93cdf1a4044ec163ce73e60d9afa5627",
//             "timeStamp": 1723717590,
//             "block": 53
//         }
//     },
type firstLastTransactions = {
	lastTransaction?: {
		txnHash: string;
		timeStamp: number;
		block: number;
	};
	firstTransaction?: {
		txnHash: string;
		timeStamp: number;
		block: number;
	};
};

type Transaction = {
	txnHash: string;
	timeStamp: number;
	valueInUsd: string;
	nonceOrValidationHash: string;
	block: number;
	txnType: string;
	from: string;
	to: string;
	txnFeeInUsd: number;
	txnFee: string;
	value: string;
};

export type AddressTxnHistorySuccessResponse = {
	//
	transactions: Transaction[];

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

	//
	firstLastTransactions: firstLastTransactions;
};

type AddressTxnHistoryFailureResponse = {
	message: string;
};

export type AddressTxnHistoryResponse =
	| AddressTxnHistorySuccessResponse
	| AddressTxnHistoryFailureResponse;

type Block = {
	timeStamp: number;
	blockHeight: number;
	txnsCount: number;
	blockReward: number;
	error: boolean;
	blockSubmitter: string;
};
export type AddressBlocksCreatedHistorySuccessResponse = {
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

	//
	blocks: Block[];
};
type AddressBlocksCreatedHistoryFailureResponse = {
	message: string;
};

export type AddressBlocksCreatedHistoryResponse =
	| AddressBlocksCreatedHistorySuccessResponse
	| AddressBlocksCreatedHistoryFailureResponse;
