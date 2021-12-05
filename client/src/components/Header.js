import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';

const Header = ({ trackCovid, country }) => {
	const [countries, setCountries] = useState([]);

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
		trackCovid(event);
	};

	return (
		<div className='app__header'>
			<h1>COVID19 Tracker</h1>
			<FormControl className='app__dropdown'>
				<Select variant='outlined' onChange={onCountryChange} value={country}>
					<MenuItem value='worldwide'>Worldwide</MenuItem>
					{countries.map((country) => (
						<MenuItem value={country.value}>{country.name}</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};

export default Header;
