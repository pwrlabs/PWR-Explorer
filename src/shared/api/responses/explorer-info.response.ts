import { Block } from 'src/shared/models/block.model';

type Txn = {
	txnHash: string;
	from: string;
	to: string;
	timeStamp: number;
	value: string;
};

export type ExplorerSuccessResponse = {
	blocksCount: number;
	marketCap: number;
	price: number;
	priceChange: number;
	totalTransactionsCount: number;
	tps: number;
	validators: number;

	blocks: Block[];

	fourteenDaysTxn: {
		[key: string]: number;
	};

	txns: Txn[];
};

type ExplorerFailureResponse = {
	message: string;
};

export type ExplorerInfoResponse = ExplorerSuccessResponse | ExplorerFailureResponse;
