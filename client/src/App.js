import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@mui/material';

// components
import Header from './components/Header';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';

// utils
import { sortData, prettyStat } from './utils';

// styles
import 'leaflet/dist/leaflet.css';
import './index.css';

function App() {
	const [country, setCountry] = useState('worldwide');
	const [countryInfo, setCountryInfo] = useState({});
	const [countries, setCountries] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
	const [mapZoom, setMapZoom] = useState(3);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState('cases');

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

					let sortedData = sortData(data);
					setCountries(countries);
					setMapCountries(data);
					setTableData(sortedData);
				});
		};

		getCountriesData();
	}, [mapCenter]);

	const trackCovid = async (event) => {
		const countryCode = event.target.value;

		const url =
			countryCode === 'worldwide'
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
				setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
				setMapZoom(4);
			});

		setCountry(countryCode);
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
						isCases
						active={casesType === 'cases'}
						onClick={(e) => setCasesType('cases')}
						title='Coronavirus Cases'
						cases={prettyStat(countryInfo.todayCases)}
						total={prettyStat(countryInfo.cases)}
					/>
					<InfoBox
						isRecovered
						active={casesType === 'recovered'}
						onClick={(e) => setCasesType('recovered')}
						title='Recovered'
						cases={prettyStat(countryInfo.todayRecovered)}
						total={prettyStat(countryInfo.recovered)}
					/>
					<InfoBox
						isDeaths
						active={casesType === 'deaths'}
						onClick={(e) => setCasesType('deaths')}
						title='Deaths'
						cases={prettyStat(countryInfo.todayDeaths)}
						total={prettyStat(countryInfo.deaths)}
					/>
				</div>
				<Map
					countries={mapCountries}
					casesType={casesType}
					center={mapCenter}
					zoom={mapZoom}
				/>
			</div>
			<Card className='app__right'>
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={tableData} />
					<h3 className='app__graphTitle'>Worldwide new {casesType}</h3>
					<LineGraph className='app__graph' casesType={casesType} />
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
