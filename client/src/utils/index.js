import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors = {
	cases: {
		hex: '#CC1034',
		multiplier: 150,
	},
	recovered: {
		hex: '#7dd71d',
		multiplier: 150,
	},
	deaths: {
		hex: '#fb1',
		multiplier: 500,
	},
};

// draw circles on the map
export const showDataOnMap = (data, caseType = 'cases') =>
	data.map((country) => (
		<Circle
			center={[country.countryInfo.lat, country.countryInfo.long]}
			fillOpacity={0.4}
			color={casesTypeColors[caseType].hex}
			fillColor={casesTypeColors[caseType].hex}
			radius={
				Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier
			}
		>
			<Popup>
				<div className='info-container'>
					<div
						className='info-flag'
						style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
					/>
					<div className='info-name'>{country.country}</div>
					<div className='info-confirmed'>
						Cases: {numeral(country.cases).format('0,0')}{' '}
					</div>
					<div className='info-recovered'>
						Recovered: {numeral(country.recovered).format('0,0')}{' '}
					</div>
					<div className='info-deaths'>
						Deaths: {numeral(country.deaths).format('0,0')}{' '}
					</div>
				</div>
			</Popup>
		</Circle>
	));

// sort countries from high to low
export const sortData = (data) => {
	const sortedData = [...data];
	return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

// export const sortData = (data) => {
// 	const sortedData = [...data];

// 	sortedData.sort((a, b) => {
// 		if (a.cases > b.cases) {
// 			return -1;
// 		} else {
// 			return 1;
// 		}
// 	});

// 	return sortedData;
// };

export const prettyStat = (stat) =>
	stat ? `+${numeral(stat).format('0.0a')}` : '+0';
