import React, { useState, useEffect } from 'react';

import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
	legend: {
		display: false,
		position: 'top',
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

function LineGraph({ casesType = 'cases', countryCode, ...props }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		if (countryCode === 'worldwide') {
			async function fetchWorldData() {
				const response = await fetch(
					'https://disease.sh/v3/covid-19/historical/all?lastdays=600'
				);
				const data = await response.json();
				let chartData = buildChartData(data, casesType);
				setData(chartData);
			}
			fetchWorldData();
		} else {
			async function fetchCountryData() {
				const response = await fetch(
					`https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=600`
				);
				const data = await response.json();
				const { timeline } = data;
				let chartData = buildChartData(timeline, casesType);
				setData(chartData);
			}
			fetchCountryData();
		}
	}, [casesType, countryCode]);

	return (
		<div className={props.className}>
			{data?.length > 0 && (
				<Line
					data={{
						datasets: [
							{
								label: 'Cases',
								data: data,
								fill: true,
								backgroundColor: `${
									casesType === 'cases'
										? 'rgba(204, 16, 52, 0.5)'
										: casesType === 'deaths'
										? 'rgba(255, 187, 16, 0.5)'
										: '#82e71550'
								}`,
								borderColor: `${
									casesType === 'cases'
										? 'rgba(204, 16, 52, 1)'
										: casesType === 'deaths'
										? 'rgba(255, 187, 16, 1)'
										: '#82e715'
								}`,
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
