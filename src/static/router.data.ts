const ROUTES = {
	transactions: '/blockchain/transactions',

	blocks: '/blockchain/blocks',
	blockTxns: (blockNumber: number) => `/blockchain/blocks/${blockNumber}/transactions`,

	nodes: '/blockchain/nodes',
	address: '/blockchain/address',
};

export default ROUTES;
