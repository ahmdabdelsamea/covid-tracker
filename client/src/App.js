import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';

import Header from './components/Header';
import InfoBox from './components/InfoBox';

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('worldwide');

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((result) => ({
						name: result.country,
						value: result.countryInfo.iso2,
					}));

					setCountries(countries);
				});
		};

		getCountriesData();
	}, []);

	const onCountryChange = (event) => {
		const countryCode = event.target.value;
		setCountry(countryCode);
	};

	return (
		<div className='app'>
			<Header />
			<div className='app__stats'>
				<InfoBox title='Coronavirus Cases' cases={299} total={5000} />
				<InfoBox title='Recovered' cases={299} total={5000} />
				<InfoBox title='Deaths' cases={299} total={5000} />
			</div>

			{/* <div className='app__header'>
				<h1>COVID19 Tracker</h1>
				<FormControl className='app__dropdown'>
					<Select variant='outlined' onChange={onCountryChange} value={country}>
						<MenuItem value='worldwide'>Worldwide</MenuItem>
						{countries.map((country) => (
							<MenuItem value={country.value}>{country.name}</MenuItem>
						))}
					</Select>
				</FormControl>
			</div> */}
		</div>
	);
}

export default App;
