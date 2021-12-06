import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@mui/material';

// components
import Header from './components/Header';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table/index.js';

// utils
import { sortData } from './utils';

function App() {
	const [country, setCountry] = useState('worldwide');
	const [countryInfo, setCountryInfo] = useState({});
	const [countries, setCountries] = useState([]);
	const [tableData, setTableData] = useState([]);

	// fetch worldwide data
	useEffect(() => {
		fetch('https://disease.sh/v3/covid-19/all')
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

	// fetch county and table data
	useEffect(() => {
		const getCountriesData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((result) => ({
						name: result.country,
						id: result.countryInfo._id,
						value: result.countryInfo.iso2,
					}));

					const sortedData = sortData(data);
					setTableData(sortedData);
					setCountries(countries);
				});
		};

		getCountriesData();
	}, []);

	const trackCovid = async (event) => {
		const countryCode = event.target.value;

		const url =
			countryCode === 'worldwide'
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountry(countryCode);
				setCountryInfo(data);
			});
	};

	return (
		<div className='app'>
			<div className='app__left'>
				<Header
					country={country}
					trackCovid={trackCovid}
					countries={countries}
				/>
				<div className='app__stats'>
					<InfoBox
						title='Coronavirus Cases'
						cases={countryInfo.todayCases}
						total={countryInfo.cases}
					/>
					<InfoBox
						title='Recovered'
						cases={countryInfo.todayRecovered}
						total={countryInfo.recovered}
					/>
					<InfoBox
						title='Deaths'
						cases={countryInfo.todayDeaths}
						total={countryInfo.deaths}
					/>
				</div>
				<Map />
			</div>
			<Card className='app__right'>
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={tableData} />
					<h3>Worldwide new Cases</h3>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
