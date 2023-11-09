function Table() {
	return (
		<table className="table-auto bg-awhite w-full ">
			{/* table body */}
			<tbody>
				{new Array(10).fill(0).map((txn, idx) => (
					<tr
						key={idx}
						className={` ${
							idx % 2 == 0
								? ' dark:bg-abrandc-dark-grey bg-abrandc-light-grey'
								: 'bg-transparent'
						}`}
					>
						{/* txn hash */}
						<td className="xl:px-8 px-2 py-8">
							<div className="flex gap-x-2 justify-start">
								<div className="dark:text-ablue-300 text-ablue-200 font-medium">
									0x000000000
								</div>
							</div>
						</td>

						{/* block */}
						<td className="xl:px-8 px-2 py-8">
							<div className="dark:text-ablue-300 text-ablue-200 font-medium text-center block">
								123
							</div>
						</td>

						{/* time ago */}
						<td className="xl:px-8 px-2 py-8">
							<div className="dark:text-white text-abrandc-dark-grey font-normal text-center">
								1 hour ago
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default function TestPage() {
	return (
		<div className="container-2 mx-auto">
			<h1 className="text-black dark:text-white">Testosterona</h1>
			<div className="flex gap-x-4">
				<Table />
				<Table />
			</div>
		</div>
	);
}

// export default SkeletonTable;
