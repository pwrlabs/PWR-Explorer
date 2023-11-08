import { BnToDec } from '@/shared/utils/formatters';
import BigNumber from 'bignumber.js';

export default function Page() {
	const v = 123;

	function bn(value: string, decimals = 9, precision = 2) {
		const bn = new BigNumber(value).shiftedBy(-decimals);
		const float = bn.toFixed(precision);
		const r = BigNumber(float).toFixed();
		return r;
	}

	return (
		<main className="min-h-screen-2 box-border">
			<div className="container-2">{bn(v, 9, 9)}</div>
		</main>
	);
}
