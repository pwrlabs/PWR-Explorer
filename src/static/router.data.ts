const ROUTES = {
	root: '/',

	transactions: '/blockchain/transactions',

	blocks: '/blockchain/blocks',
	blockTxns: (blockNumber: number) => `/blockchain/blocks/${blockNumber}/transactions`,

	nodes: '/blockchain/nodes',
	address: '/address',
};

export default ROUTES;
