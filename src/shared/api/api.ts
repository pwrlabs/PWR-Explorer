const _baseUrl = process.env.NEXT_PUBLIC_API_URL;
const api = {
	baseUrl: _baseUrl,

	blocks: {
		latests: (page: number, count: number) =>
			`${_baseUrl}/latestBlocks/?page=${page}&count=${count}`,
		details: (blockNumber: number) => `${_baseUrl}/blockDetails/?blockNumber=${blockNumber}`,
		allTxn: (blockNumber: number, page: number, count: number) =>
			`${_baseUrl}/blockTransactions/?blockNumber=${blockNumber}&page=${page}&count=${count}`,
	},
	explorer: {
		info: `${_baseUrl}/explorerInfo/`,
	},
	transactions: {
		details: (txnHash: string) => `${_baseUrl}/transactionDetails/?txnHash=${txnHash}`,
		latest: (page: number, count: number) =>
			`${_baseUrl}/latestTransactions/?page=${page}&count=${count}`,
	},
	user: {
		txnHistory: (address: string, page: number, count: number) =>
			`${_baseUrl}/transactionHistory/?address=${address}&count=${count}&page=${page}`,

		balance: (address: string) => `${_baseUrl}/balanceOf/?userAddress=${address}`,
		blocksCreated: (address: string, page: number, count: number) =>
			`${_baseUrl}/blocksCreated/?validatorAddress=${address}&page=${page}&count=${count}`,
	},
	nodes: {
		nodesInfo: (page: number, count: number) =>
			`${_baseUrl}/nodesInfo/?page=${page}&count=${count}`,
	},
};

export default api;
