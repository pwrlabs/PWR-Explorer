import axios, { type AxiosResponse } from 'axios';

import api from './api';
import { ExplorerInfoResponse } from './responses/explorer-info.response';

interface Transaction {
	txnHash: string;
	timeStamp: string;
	txnFee: number;
	txnFeeInUsd: number;
	txnType: string;
	value: number;
	valueInUsd: number;
}

// interface Block {
// 	blockHash: string;
// 	blockNumber: number;
// 	transactions: Transaction[];
// }

// interface ExplorerInfo {
// 	latestBlock: Block;
// }

const QueryApi = {
	blocks: {
		latests: async (count: number): Promise<AxiosResponse> => {
			const url = api.blocks.latests(count);
			return axios({
				method: 'get',
				url,
			});
		},
		details: async (blockNumber: number): Promise<AxiosResponse> => {
			const url = api.blocks.details(blockNumber);
			return axios({
				method: 'get',
				url,
			});
		},
		allTxn: async (blockNumber: number): Promise<AxiosResponse> => {
			const url = api.blocks.allTxn(blockNumber);
			return axios({
				method: 'get',
				url,
			});
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
	transcations: {
		details: async (txnHash: string): Promise<AxiosResponse> => {
			const url = api.transactions.details(txnHash);
			return axios({
				method: 'get',
				url,
			});
		},
		latest: async (count: number): Promise<AxiosResponse> => {
			const url = api.transactions.latest(count);
			return axios({
				method: 'get',
				url,
			});
		},
	},
};

export default QueryApi;
