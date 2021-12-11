import React, { useRef } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../../utils';
import './map.css';

function Map({ countries, casesType, center, zoom }) {
	const mapRef = useRef(3);

	return (
		<div className='map'>
			<LeafletMap center={center} zoom={zoom} ref={mapRef}>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				{showDataOnMap(countries, casesType)}
			</LeafletMap>
		</div>
	);
}

export default Map;
