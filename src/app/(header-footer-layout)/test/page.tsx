import LatestBlocksTable from '@/components/internal/root-page/latest-blocks-table';
import LatestTxnsTable from '@/components/internal/root-page/latest-txns-table';

export default function TestPage() {
	return (
		<div className="container-2 mx-auto">
			<h1 className="text-black dark:text-white">Testosterona</h1>
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-5">
				<LatestBlocksTable
					blocks={new Array(10).fill({
						blockHeight: 123456,
						blockSubmitter: '0x0000000000000000000000000000000000000000',
						blockReward: '123000',
						timeStamp: 1699558140,
						txnsCount: 123,
					})}
				/>
				<LatestTxnsTable
					transactions={new Array(10).fill({
						from: '0x0000000000000000000000000000000000000000',
						to: '0x0000000000000000000000000000000000000000',
						timeStamp: 1699558140,
						txnHash:
							'0x3a203f4c5cf6b2c76b5703e3b2b3c3d4112233445566778899aabbccddeeff00',
						value: '123000',
					})}
				/>
			</div>
		</div>
	);
}
