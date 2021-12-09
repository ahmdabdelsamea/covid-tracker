import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

import './infoBox.css';

const InfoBox = ({
	active,
	isCases,
	isRecovered,
	isDeaths,
	title,
	cases,
	total,
	...props
}) => {
	return (
		<Card
			onClick={props.onClick}
			className={`infoBox 
				${active && 'infoBox--selected'}
				${isCases && 'infoBox--red'}  
				${isRecovered && 'infoBox--green'} 
				${isDeaths && 'infoBox--yellow'}
			`}
		>
			<CardContent>
				<Typography className='title' color='textSecondary'>
					{title}
				</Typography>
				<h2
					className={`infoBox__cases
						${isCases && 'infoBox--cases--red'}  
						${isRecovered && 'infoBox--cases--green'} 
						${isDeaths && 'infoBox--cases--yellow'}
			`}
					// className='infoBox__cases'
				>
					{cases}
				</h2>
				<Typography className='infoBox__total' color='textSecondary'>
					{total}
					<span>Total</span>
				</Typography>
			</CardContent>
		</Card>
	);
};

export default InfoBox;
