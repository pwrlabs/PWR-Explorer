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
    const [categories, setCategories] = useState<string[]>(['192']);

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            const dates = Object.keys(data).map((timestamp) => {
                const date = new Date(parseInt(timestamp) * 1000);
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                });
            });
            const values = Object.values(data);

            setCategories(dates);
            setSeriesData(values);
        }
    }, [data]);

    const minValue = Math.min(...seriesData);
    const maxValue = Math.max(...seriesData);

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
                rotate: 0, // Prevents diagonal rotation
                formatter: function (value: any, timestamp: any) {
                    // Show only the first day, middle day, and last day
                    const idx = categories.indexOf(value);

                    if (idx === 0 || idx === 6 || idx === 13) {
                        return value;
                    }
                    return '';
                },
            }, // Show x-axis labels
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            show: true, // Show y-axis labels
            min: Math.floor(minValue / 1000) * 1000,
            max: Math.ceil(maxValue / 1000) * 1000,
            labels: {
                formatter: (value) => {
                    if (value === Math.floor(minValue / 1000) * 1000) {
                        return `${Math.floor(value / 1000)}k`;
                    } else if (value === Math.ceil(maxValue / 1000) * 1000) {
                        return `${Math.ceil(value / 1000)}k`;
                    }
                    return '';
                },
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
                formatter: (value, { dataPointIndex }) => {
                    return categories[dataPointIndex] ? categories[dataPointIndex] : 'N/A';
                },
            },
            y: {
                formatter: (value) => {
                    return Math.round(value).toString();
                },
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
            data: seriesData.length ? seriesData : [0],
        },
    ];

    return (
        <div className="w-full h-48 bg-agrey-50 dark:bg-agrey-900 p-4 rounded-md">
            <h1 className="text-agrey-600 text-sm font-medium leading-normal uppercase">
                Transaction History in 14 Days
            </h1>
            <div className="">
                <Chart options={options} series={series} type="area" width="100%" height={150} />{' '}
            </div>
        </div>
    );
};

export default TransactionChart;