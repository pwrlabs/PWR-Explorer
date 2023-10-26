import { Block } from '@/shared/models/block.model';

type Transaction = {
	txnHash: string;
	from: string;
	to: string;
	timeStamp: number;
	value: string;
	blockNumber: number;
	txnType: string;
};

type AddressTxnHistorySuccessResponse = {
	status: 'success';
	data: {
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
	};
};

type AddressTxnHistoryFailureResponse = {
	status: 'failure';
	data: null;
};

export type AddressTxnHistoryResponse =
	| AddressTxnHistorySuccessResponse
	| AddressTxnHistoryFailureResponse;
