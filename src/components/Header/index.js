import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import './header.css';

const Header = ({ trackCovid, country, countries }) => {
	const onCountryChange = (event) => {
		trackCovid(event);
	};

	return (
		<div className='app__header'>
			<h1>COVID19 Tracker</h1>
			<FormControl className='app__dropdown'>
				<Select variant='outlined' onChange={onCountryChange} value={country}>
					<MenuItem value='worldwide'>Worldwide</MenuItem>
					{countries.map((country, index) => (
						<MenuItem key={index} value={country.value}>
							{country.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};

export default Header;
