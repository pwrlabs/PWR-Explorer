import axios, { type AxiosResponse } from 'axios';

import api from './api';
import { ExplorerInfoResponse } from './responses/explorer-info.response';
import { LatestTransactionsResponse } from './responses/txn/latests-txns.response';
import { TransactionDetailResponse } from './responses/txn/txn-details.response';
import { LatestBlocksResponse } from './responses/blocks/latest-blocks.response';
import { BlockTransactionsResponse } from './responses/blocks/block-txns-response';
import { BlockDetailsResponse } from './responses/blocks/block-details.response';
import { AddressTxnHistoryResponse } from './responses/addresss/txn-history.response';

interface Transaction {
	txnHash: string;
	timeStamp: string;
	txnFee: number;
	txnFeeInUsd: number;
	txnType: string;
	value: number;
	valueInUsd: number;
}

const QueryApi = {
	blocks: {
		latests: async (page: number, count: number): Promise<LatestBlocksResponse> => {
			const url = api.blocks.latests(page, count);
			const res = await axios({
				method: 'get',
				url,
			});

			if (res.data.status === 'failure') throw new Error('Failed to fetch latest blocks');

			return res.data;
		},
		details: async (blockNumber: number): Promise<BlockDetailsResponse> => {
			const url = api.blocks.details(blockNumber);
			const res = await axios({
				method: 'get',
				url,
			});

			if (res.data.status === 'failure') throw new Error('Failed to fetch block details');

			return res.data;
		},
		allTxn: async (
			blockNumber: number,
			page: number,
			count: number
		): Promise<BlockTransactionsResponse> => {
			const url = api.blocks.allTxn(blockNumber, page, count);

			const res = await axios({
				method: 'get',
				url,
			});

			if (res.data.status === 'failure') throw new Error('Failed to fetch all transactions');

			return res.data;
		},
	},
	explorer: {
		info: async (): Promise<ExplorerInfoResponse> => {
			const url = api.explorer.info;

			const res = await axios<ExplorerInfoResponse>({
				method: 'get',
				url,
			});

			if (res.data.status === 'failure') throw new Error('Failed to fetch explorer info');

			return res.data;
		},
	},
	transactions: {
		details: async (txnhash: string): Promise<TransactionDetailResponse> => {
			const url = api.transactions.details(txnhash);
			const res = await axios<TransactionDetailResponse>({
				method: 'get',
				url,
			});

			if (res.data.status === 'failure')
				throw new Error('Failed to fetch transaction details');

			return res.data;
		},
		latest: async (page: number, count: number): Promise<LatestTransactionsResponse> => {
			console.log({
				page,
				count,
			});

			const url = api.transactions.latest(page, count);

			const res = await axios({
				method: 'get',
				url,
			});

			if (res.data.status === 'failure') throw new Error('Failed to fetch explorer info');

			return res.data;
		},
	},
	user: {
		txnHistory: {
			getTxnHistory: async (
				address: string,
				count: number,
				page: number
			): Promise<AddressTxnHistoryResponse> => {
				const url = api.user.txnHistory.getTxnHistory(address, count, page);
				const res = await axios({
					method: 'get',
					url,
				});

				if (res.data.status === 'failure')
					throw new Error('Failed to fetch transaction history');

				return res.data;
			},
		},
	},
};

export default QueryApi;
