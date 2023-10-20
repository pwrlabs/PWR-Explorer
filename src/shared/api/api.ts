// const _baseUrl = process.env.PLASMO_PUBLIC_API_URL;
// console.log('🚀 ~ file: api.ts:2 ~ _baseUrl:', _baseUrl);

const _baseUrl = 'https://pwrexplorerbackend.pwrlabs.io';

const api = {
	baseUrl: _baseUrl,

	blocks: {
		latests: (count: number) => `${_baseUrl}/latestBlocks/?count=${count}`,
		details: (blockNumber: number) => `${_baseUrl}/blockDetails/?blockNumber=${blockNumber}`,
		allTxn: (blockNumber: number) =>
			`${_baseUrl}/blockTransactions/?blockNumber=${blockNumber}`,
	},
	explorer: {
		info: `${_baseUrl}/explorerInfo/`,
	},
	transactions: {
		details: (txnHash: string) => `${_baseUrl}/transactionDetails/?txnHash=${txnHash}`,
		latest: (count: number) => `${_baseUrl}/latestTransactions/?count=${count}`,
	},
};

export default api;
