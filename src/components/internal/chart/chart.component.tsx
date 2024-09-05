import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type TransactionData = {
	[key: number]: number;
};

type TransactionChartProps = {
	data: TransactionData;
};

const TransactionChart = ({ data }: TransactionChartProps) => {
	const [seriesData, setSeriesData] = useState<number[]>([]);
	const [categories, setCategories] = useState<string[]>([]);

	console.log('data', data);

	useEffect(() => {
		if (data && Object.keys(data).length > 0) {
			const dates = Object.keys(data).map((timestamp) => {
				const date = new Date(parseInt(timestamp) * 1000);
				return date.toLocaleDateString('en-US', {
					month: 'short', // Only display month
					day: 'numeric', // Only display day number
				});
			});
			const values = Object.values(data);

			setCategories(dates);
			setSeriesData(values);
		}
	}, [data]);

	const options: ApexOptions = {
		chart: {
			type: 'area',
			toolbar: { show: false },
			zoom: { enabled: false },
		},
		dataLabels: { enabled: false },
		stroke: { curve: 'smooth', width: 2, colors: ['#112FF8'] }, // Updated line color to #112FF8
		grid: { show: false },
		xaxis: {
			type: 'category',
			categories,
			labels: {
				show: true,
				style: {
					colors: '#737289', // Custom color for Y-axis labels (change to your desired color)
					fontSize: '12px', // Adjust font size if necessary
					fontWeight: 'bold',
				},
			}, // Show x-axis labels
			axisBorder: { show: false },
			axisTicks: { show: false },
		},
		yaxis: {
			show: true, // Show y-axis labels
			labels: {
				formatter: (value) => (value ? `${value / 1000}k` : '0k'), // Ensure value is valid
				style: {
					colors: '#737289', // Custom color for Y-axis labels (change to your desired color)
					fontSize: '12px', // Adjust font size if necessary
					fontWeight: 'bold',
				},
			},
		},
		tooltip: {
			enabled: true,
			x: {
				formatter: (value) => (value ? value.toString() : 'N/A'), // Fallback if value is undefined
			},
		},
		markers: {
			size: 0, // No visible points on the chart
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'light',
				type: 'vertical',
				shadeIntensity: 1,
				gradientToColors: ['rgba(224, 223, 234, 0)'], // Transparent part of the gradient
				inverseColors: false,
				opacityFrom: 1, // Full opacity at the start
				opacityTo: 0, // Fully transparent at the end
				stops: [0, 100],
				colorStops: [
					{
						offset: 0,
						color: '#CCCCFE', // Start color (matching #CCCCFE)
						opacity: 1,
					},
					{
						offset: 100,
						color: 'rgba(224, 223, 234, 0)', // End color
						opacity: 0,
					},
				],
			},
		},
		colors: ['#112FF8'], // Line color to #112FF8
	};

	const series = [
		{
			name: 'Transactions',
			data: seriesData.length ? seriesData : [0], // Ensure the seriesData is not empty
		},
	];

	return (
		<div className="w-[400px] h-48 bg-agrey-50 dark:bg-agrey-900 p-4 rounded-md">
			<h1 className="text-agrey-600 text-sm font-medium leading-normal uppercase">
				Transaction History in 14 Days
			</h1>
			<div className="">
				<Chart options={options} series={series} type="area" height={150} />
			</div>
		</div>
	);
};

export default TransactionChart;
