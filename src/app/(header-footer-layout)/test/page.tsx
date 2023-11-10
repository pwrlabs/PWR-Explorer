'use client';
import api from '@/shared/api/api';
import axios from 'axios';
import { useQuery } from 'react-query';

type Block = {
	timeStamp: number;
	blockHeight: number;
	txnsCount: number;
	blockReward: number;
	blockSubmitter: string;
};

async function fetchPosts() {
	const url = 'https://pwrexplorerbackend.pwrlabs.io/explorerInfoo/';

	const res = await axios<{ blocks: Block[] }>({
		method: 'GET',
		url: url,
	});

	return res.data;
}

export default function TestPage() {
	const { data, isLoading, isError } = useQuery(['test'], fetchPosts);

	// if (isLoading) return <div className="text-black dark:text-white">Loading...</div>;

	function RenderSkeleton() {
		return (
			<div className="skeleton-container">
				<div className="skeleton-title w-[180px]"></div>
				<div className="skeleton-line w-[250px]"></div>
				<div className="skeleton-line w-[100px]"></div>
			</div>
		);
	}
	if (isError) return <div className="text-black dark:text-white">Error</div>;

	if (!isLoading && !data) return <div className="text-black dark:text-white">Error</div>;

	return (
		<div className="container-2 mx-auto space-y-4">
			<h1 className="text-black dark:text-white text-2xl medium pl-2">Posts</h1>
			<div className="space-y-2">
				{isLoading ? (
					<div className="space-y-12">
						{[1, 2, 3, 4, 5].map((_, idx) => (
							<RenderSkeleton key={idx} />
						))}
					</div>
				) : (
					data.blocks.map((block, idx) => (
						<div
							key={idx}
							className="bg-agrey-800 text-white bg-opacity-20 p-4 rounded-xl"
						>
							<h1>{block.blockHeight}</h1>
							<h1>{block.blockSubmitter}</h1>
						</div>
					))
				)}
			</div>
		</div>
	);
}
