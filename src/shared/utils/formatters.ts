import BigNumber from 'bignumber.js';

export function numberWithCommas(num: number): string {
	return num.toLocaleString('en-US');
}

export function timeAgo(timestamp: number): string {
	const seconds = Math.floor((new Date().getTime() - timestamp * 1000) / 1000);

	const intervals = {
		year: { singular: 'year', plural: 'years', seconds: 31536000 },
		month: { singular: 'month', plural: 'months', seconds: 2592000 },
		week: { singular: 'week', plural: 'weeks', seconds: 604800 },
		day: { singular: 'day', plural: 'days', seconds: 86400 },
		hour: { singular: 'hour', plural: 'hours', seconds: 3600 },
		minute: { singular: 'min', plural: 'mins', seconds: 60 },
		second: { singular: 'sec', plural: 'secs', seconds: 1 },
	};

	for (const [intervalName, interval] of Object.entries(intervals)) {
		const intervalCount = Math.floor(seconds / interval.seconds);

		if (intervalCount >= 1) {
			const intervalText = intervalCount > 1 ? interval.plural : interval.singular;
			return `${intervalCount} ${intervalText} ago`;
		}
	}

	return 'just now';
}

export function shortenAddress(address: string, chars = 4): string {
	return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

export function BnToDec(value: string, decimals = 9, precision = 2) {
	const bn = new BigNumber(value).shiftedBy(-decimals);

	return bn.toFixed(precision).toString();
}
