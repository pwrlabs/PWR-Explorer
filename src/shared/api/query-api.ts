import axios, { type AxiosResponse } from 'axios';

import api from './api';

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
		latests: async (count: number): Promise<AxiosResponse> => {
			const url = api.blocks.latests(count);
			return axios({
				method: 'get',
				url,
			});
		},
	},
};

export default QueryApi;
