import { Block } from '@/shared/models/block.model';

type Txn = {
	txnHash: string;
	from: string;
	to: string;
	timeStamp: number;
	value: string;
};

type ExplorerSuccessResponse = {
	status: 'success';
	data: {
		blocksCount: number;
		marketCap: number;
		price: number;
		priceChange: number;
		totalTransactionsCount: number;
		tps: number;
		validators: number;

		blocks: Block[];

		txns: Txn[];
	};
};

type ExplorerFailureResponse = {
	status: 'failure';
	data: null;
};

export type ExplorerInfoResponse = ExplorerSuccessResponse | ExplorerFailureResponse;
