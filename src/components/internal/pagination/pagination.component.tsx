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

	// Adjust pagination when there are more pages than buttons to show
	if (totalPages > buttonsToShow) {
		const half = Math.floor(buttonsToShow / 2);
		if (currentPage <= half) {
			endPage = buttonsToShow;
		} else if (currentPage + half >= totalPages) {
			firstPage = totalPages - buttonsToShow + 1 > 1 ? totalPages - buttonsToShow + 1 : 1;
			endPage = totalPages;
		} else {
			firstPage = currentPage - half;
			endPage = currentPage + half;
		}
	}

	// *~~*~~*~~ handle clicks ~~*~~*~~* //
	function loadPrevPage() {
		if (metadata.previousPage !== -1) {
			onPageChange(metadata.previousPage);
		}
	}

	function loadNextPage() {
		if (metadata.nextPage !== -1) {
			onPageChange(metadata.nextPage);
		}
	}

	function handlePageClick(pageNumber: number) {
		// Validate that the clicked page is within the valid range
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			onPageChange(pageNumber);
		}
	}

	const [inputValue, setInputValue] = useState<number>(metadata.currentPage);

	function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const targetPage = parseInt(e.target.value, 10);

		// Check if the input is valid (greater than 0 and less than or equal to total pages)
		if (targetPage > 0 && targetPage <= metadata.totalPages) {
			e.target.style.borderColor = ''; // Reset the border color
			onPageChange(targetPage);
		} else {
			e.target.style.borderColor = 'red'; // Set a red border around the input
		}
	}

	// *~~*~~*~~ render buttons ~~*~~*~~* //
	const pageButtons = [];
	for (let i = firstPage; i <= endPage; i++) {
		pageButtons.push(
			<button
				key={i}
				onClick={() => handlePageClick(i)}
				className={`pagination-btn !w-fit ${metadata.currentPage === i ? 'active ' : ''}`}
			>
				{i}
			</button>
		);
	}

	// Add ellipsis and first page button if needed
	if (firstPage > 1) {
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

	// Add ellipsis and last page button if needed
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
		<div className="pagination flex justify-between items-center ">
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

				<div className="w-[220px] sm:w-full sm:overflow-visible overflow-hidden">
					<ul className="flex gap-x-1 sm:overflow-visible overflow-x-auto hide-scrollbar">
						{pageButtons.map((btn, idx) => (
							<li key={idx} className="shrink-0">
								{btn}
							</li>
						))}
					</ul>
				</div>

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
				<label className="text-agrey-900 dark:text-white text-sm font-medium hidden md:block">
					Go to page
				</label>

				<input
					style={{
						border:
							inputValue > metadata.totalPages
								? '2px solid red'
								: '2px solid transparent',
						transition: 'border 0.7s ease', // Add a transition for the border
					}}
					className="rounded-lg bg-abrandc-light-grey dark:bg-abrandc-dark-grey focus:outline-none text-black dark:text-white pl-4 h-8 w-[50px]"
					type="number"
					onFocus={(e) => (e.target as HTMLInputElement).select()} // Select the entire text on input focus
					onChange={(e) => setInputValue(parseInt(e.target.value, 10))}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							if (inputValue <= metadata.totalPages && inputValue > 0) {
								onPageChange(inputValue);
							} else {
								// Prevent changing the page and set red border
								e.preventDefault();
								setInputValue(metadata.currentPage);
								setTimeout(() => (e.target as HTMLInputElement).select(), 0); // Select the entire text after a brief delay
							}
						}
					}}
					value={inputValue}
				/>
			</div>
		</div>
	);
}
