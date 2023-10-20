import BigNumber from 'bignumber.js';

export function numberWithCommas(num: number): string {
	return num.toLocaleString('en-US');
}

export default function timeAgo(timestamp: number): string {
	const seconds = Math.floor((new Date().getTime() - timestamp * 1000) / 1000);

	const intervals = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60,
		second: 1,
	};

	for (const [intervalName, intervalSeconds] of Object.entries(intervals)) {
		const intervalCount = Math.floor(seconds / intervalSeconds);

		if (intervalCount >= 1) {
			return `${intervalCount} ${intervalName}${intervalCount > 1 ? 's' : ''} ago`;
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
