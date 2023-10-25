'use client';

import { useState } from 'react';
import './pagination.scss';

type PaginationProps = {
	metadata: {
		totalPages: number;
		currentPage: number;
		itemsPerPage: number;
		totalItems: number;
		nextPage: number; // -1 if no next page
		previousPage: number; // -1 if no previous page
		startIndex: number;
		endIndex: number;
	};
	onPageChange: (page: number) => void;
};

export default function Pagination({ metadata, onPageChange }: PaginationProps) {
	const totalPages = metadata.totalPages;
	const currentPage = metadata.currentPage;
	const buttonsToShow = 5; // number of buttons to show, including ellipsis

	let firstPage = 1;
	let endPage = totalPages;

	if (totalPages > buttonsToShow) {
		const half = Math.floor(buttonsToShow / 2);
		if (currentPage <= half) {
			endPage = buttonsToShow;
		} else if (currentPage + half >= totalPages) {
			firstPage = totalPages - buttonsToShow + 1;
		} else {
			firstPage = currentPage - half;
			endPage = currentPage + half;
		}
	}

	// *~~*~~*~~ handle clicks ~~*~~*~~* //
	function loadPrevPage() {
		if (metadata.previousPage) {
			onPageChange(metadata.previousPage);
		}
	}
	function loadNextPage() {
		if (metadata.nextPage) {
			onPageChange(metadata.nextPage);
		}
	}
	function handlePageClick(pageNumber: number) {
		onPageChange(pageNumber);
	}

	const [inputValue, setInputValue] = useState<number>(metadata.currentPage);

	function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const targetPage = e.target.value as unknown as number;

		if (targetPage > 0 && targetPage <= metadata.totalPages) {
			onPageChange(targetPage);
		}
	}

	// *~~*~~*~~ render buttons ~~*~~*~~* //

	// create buttons
	const pageButtons = [];
	for (let i = firstPage; i <= endPage; i++) {
		pageButtons.push(
			<button
				key={i}
				onClick={() => handlePageClick(i)}
				className={`pagination-btn ${metadata.currentPage === i && 'active'}`}
			>
				{i}
			</button>
		);
	}

	//
	if (firstPage > 1) {
		// if first page is not 1, add ellipsis and first page button
		if (firstPage > 2) {
			pageButtons.unshift(
				<span key="ellipsis-start" className="text-agrey-500 dark:text-agrey-600">
					...
				</span>
			);
		}

		pageButtons.unshift(
			<button onClick={() => handlePageClick(1)} className="pagination-btn">
				1
			</button>
		);
	}

	if (endPage < totalPages) {
		if (endPage < totalPages - 1) {
			pageButtons.push(
				<span key="ellipsis-end" className="text-agrey-500 dark:text-agrey-600">
					...
				</span>
			);
		}
		pageButtons.push(
			<button onClick={() => handlePageClick(totalPages)} className="pagination-btn">
				{totalPages}
			</button>
		);
	}

	return (
		<div className="pagination">
			{/* total results */}
			<div className="hidden md:block">
				<h1 className="text-agrey-900 dark:text-white text-sm font-medium">
					Results: {metadata.startIndex} - {metadata.endIndex} of {metadata.totalItems}
				</h1>
			</div>

			{/* buttons */}
			<div className="flex items-center gap-x-2">
				<button
					onClick={loadPrevPage}
					className="prev-button"
					disabled={metadata.currentPage === 1}
				>
					<i className="far fa-angle-left fa-lg"></i>
				</button>

				<ul className="flex gap-x-1">
					{pageButtons.map((btn, idx) => (
						<li key={idx}>{btn}</li>
					))}
				</ul>

				<button
					onClick={loadNextPage}
					className="next-button"
					disabled={metadata.currentPage === metadata.totalPages}
				>
					<i className="far fa-angle-right fa-lg"></i>
				</button>
			</div>

			{/* go to page */}
			<div className="flex items-center gap-x-2">
				<label className=" text-agrey-900 dark:text-white text-sm font-medium">Go to</label>
				<input
					className="rounded-lg bg-abrandc-light-grey dark:bg-abrandc-dark-grey  focus:outline-none text-agray-900 dark:text-white pl-4 h-8 w-[50px]"
					type="number"
					onChange={inputChange}
					value={inputValue}
				/>
			</div>
		</div>
	);
}
