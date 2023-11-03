const ROUTES = {
	root: '/',

	transactions: '/transactions',

	blocks: '/blocks',
	blockTxns: (blockNumber: number) => `/blocks/${blockNumber}/transactions`,

	nodes: '/blockchain/nodes',
	address: '/address',
};

export default ROUTES;
