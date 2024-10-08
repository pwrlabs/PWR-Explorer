const ROUTES = {
	root: '/',

	transactions: '/transactions',

	blocks: '/blocks',
	blockTxns: (blockNumber: number) => `/blocks/${blockNumber}/transactions`,

	nodes: '/nodes',
	address: '/address',

	external: {
		wallet: 'https://chrome.google.com/webstore/category/extensions',
	},
};

export default ROUTES;
