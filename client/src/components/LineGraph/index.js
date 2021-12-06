import React, { useState, useEffect } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	plugins: {
		legend: {
			display: false,
			position: 'top',
		},
		title: {
			display: false,
			text: 'Worldwide new Cases',
		},
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tooltips: {
		mode: 'index',
		intersect: false,
		callbacks: {
			label: function (tooltipItem, data) {
				return numeral(tooltipItem.value).format('+0,0');
			},
		},
	},
	scales: {
		xAxes: [
			{
				type: 'time',
				time: {
					format: 'MM/DD/YY',
					tooltipFormat: 'll',
				},
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
				},
				ticks: {
					callback: function (value, index, values) {
						return numeral(value).format('0a');
					},
				},
			},
		],
	},
};

const buildChartData = (data, casesType) => {
	let chartData = [];
	let lastDataPoint;
	for (let date in data.cases) {
		if (lastDataPoint) {
			let newDataPoint = {
				x: date,
				y: data[casesType][date] - lastDataPoint,
			};
			chartData.push(newDataPoint);
		}
		lastDataPoint = data[casesType][date];
	}
	return chartData;
};

function LineGraph({ casesType = 'cases' }) {
	const [data, setData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=100')
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					let chartData = buildChartData(data, casesType);
					setData(chartData);
					console.log(chartData);
				});
		};

		fetchData();
	}, [casesType]);

	return (
		<div>
			{data?.length > 0 && (
				<Line
					data={{
						datasets: [
							{
								label: 'Cases',
								data: data,
								fill: true,
								backgroundColor: 'rgba(204, 16, 52, 0.5)',
								borderColor: '#CC1034',
							},
						],
					}}
					options={options}
				/>
			)}
		</div>
	);
}

export default LineGraph;
