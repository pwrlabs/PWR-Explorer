// const _baseUrl = process.env.PLASMO_PUBLIC_API_URL;
// console.log('🚀 ~ file: api.ts:2 ~ _baseUrl:', _baseUrl);

const _baseUrl = 'https://pwrexplorerbackend.pwrlabs.io';

const api = {
	baseUrl: _baseUrl,

	blocks: {
		latests: (count: number) => `${_baseUrl}/latestBlocks/?count=${count}`,
	},
};

export default api;
