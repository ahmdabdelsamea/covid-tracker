import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';

import Header from './components/Header';
import InfoBox from './components/InfoBox';
import Map from './components/Map';

function App() {
	const [country, setCountry] = useState('worldwide');
	const [countryInfo, setCountryInfo] = useState({});

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
				<Header country={country} trackCovid={trackCovid} />
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
					<h3>Worldwide new Cases</h3>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
