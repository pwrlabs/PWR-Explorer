'use client';

import Image from 'next/image';

import axios from 'axios';

import QueryApi from '@/shared/api/query-api';
import timeAgo, { BnToDec, shortenAddress } from '@/shared/utils/formatters';
import QUERY_KEYS from '@/static/query.keys';
import Link from 'next/link';
import { useQuery } from 'react-query';
import Button from 'src/components/internal/button/button.component';

import Pagination from '@/components/internal/pagination/pagination.component';
import { log } from 'console';
import { useState } from 'react';

const m = {};
let t = 10;
for (let i = 0; i < t; i++) {
	Object.assign(m, {
		[`_${i + 1}`]: {
			totalPages: t,
			currentPage: i + 1,
			itemsPerPage: 10,
			totalItems: t * 10,
			nextPage: i + 2 > t ? null : i + 2,
			previousPage: i < 1 ? null : i,
			startIndex: i * 10,
			endIndex: i * 10 + 9,
		},
	});
}

async function fetchTodos(page: number) {
	const res = await axios({
		method: 'GET',
		url: `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=10`,
	});

	return {
		todos: res.data,
		metadata: {
			totalPages: 20,
			currentPage: page,
			itemsPerPage: 10,
			totalItems: 200,
			nextPage: page + 1 > 20 ? null : page + 1,
			previousPage: page - 1 < 1 ? null : page - 1,
			startIndex: (page - 1) * 10,
			endIndex: (page - 1) * 10 + 9,
		},
	};
}

export default function TestPage() {
	const {
		data: txnsData,
		isLoading: txnsLoading,
		isError: txnsError,
	} = useQuery([QUERY_KEYS.latest_txns], () => QueryApi.transcations.latest(10));

	const [currentPage, setCurrentPage] = useState(1);
	const [limit] = useState(10);

	const {
		data: todos_data,
		isLoading: todos_loading,
		isError: todos_error,
	} = useQuery(['todos', currentPage], () => fetchTodos(currentPage));

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	return (
		<div className="container2 px-8">
			{todos_loading ? (
				<div>loading...</div>
			) : todos_error ? (
				<div>error...</div>
			) : (
				<>
					<div className="space-y-2">
						{todos_data?.todos.map((todo, idx) => (
							<div
								key={idx}
								className={`p-2 flex gap-x-2 items-center ${
									todo.completed ? 'bg-green-200' : 'bg-blue-100'
								}`}
							>
								<div>{todo.id}</div>
								<div>{todo.title}</div>
							</div>
						))}
					</div>

					<Pagination metadata={todos_data?.metadata} onPageChange={handlePageChange} />
				</>
			)}
			{/* {Object.entries(m).map(([key, value], idx) => (
				<div className="flex gap-x-[300px] items-center" key={idx}>
					<div>pagination: {idx + 1}</div>
					<Pagination metadata={value} />
				</div>
			))} */}
		</div>
	);
}
