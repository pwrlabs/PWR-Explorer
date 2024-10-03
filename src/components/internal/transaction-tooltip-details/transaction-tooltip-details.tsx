'use client';

import Image from 'next/image';

import { BnToDec } from 'src/shared/utils/formatters';

type TransactionTooltipDetailsProps = {
	fee: string;
	// usdFee: number;
	nonce: string;
};

const TransactionTooltipDetails = ({ fee, nonce }: TransactionTooltipDetailsProps) => {
	return (
		<div className="flex flex-col  p-3 dark:bg-abrandc-dark-blackish bg-white text-agrey-900 dark:text-white rounded-2xl   w-64 z-index-3">
			<div className="text-left p-1">
				<h1>Additional Info</h1>
			</div>
			<div className="border-b border-agrey-200 p-1 text-left">
				<p className="text-agrey-600">Block</p>
				<div className="flex items-center gap-1">
					<Image
						src="/icons/verification.png"
						width={25}
						height={25}
						className="inline-block"
						alt=""
					/>

					<p className="text-abrandc-dark-green">success</p>
					<h6 className="text-sm font-normal  w-full text-agrey-500 text-nowrap">
						(1 block confirmation)
					</h6>
				</div>
			</div>
			<div className="border-b border-agrey-200 p-3 text-left">
				<p className="text-agrey-600">Transaction Fee:</p>
				<p>
					{BnToDec(fee, 9, 9)}
					{/* <span>(${usdFee})</span> */}
				</p>
			</div>
			<div className="text-left p-3">
				<p className="text-agrey-600">Nonce</p>
				<p>
					{nonce}
					{/* <span className="font-normal text-agrey-600">(in the position 149)</span> */}
				</p>
			</div>
		</div>
	);
};

export default TransactionTooltipDetails;
