'use client';

import Image from 'next/image';

import axios from 'axios';

import QueryApi from '@/shared/api/query-api';
import { BnToDec, shortenAddress, timeAgo } from '@/shared/utils/formatters';
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
			nextPage: page + 1 > 20 ? -1 : page + 1,
			previousPage: page - 1 < 1 ? -1 : page - 1,
			startIndex: (page - 1) * 10,
			endIndex: (page - 1) * 10 + 9,
		},
	};
}

export default function TestPage() {
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
						{todos_data?.todos.map((todo: any, idx: number) => (
							<div
								key={idx}
								className={`p-2 flex gap-x-2 items-center bg-opacity-20 dark:text-white rounded-md ${
									todo.completed ? 'bg-blue-800 ' : 'bg-blue-100'
								}`}
							>
								<div>{todo.id}</div>
								<div>{todo.title}</div>
							</div>
						))}
					</div>

					<Pagination
						metadata={
							todos_data?.metadata || {
								totalPages: 0,
								currentPage: 0,
								itemsPerPage: 0,
								totalItems: 0,
								nextPage: -1,
								previousPage: -1,
								startIndex: 0,
								endIndex: 0,
							}
						}
						onPageChange={handlePageChange}
					/>
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
