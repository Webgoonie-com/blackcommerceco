'use client';

import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'


import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl; 
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface MapProps {
    center?: number[],
    mapCenterReasonTxt?: string | null;
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';


const Map: React.FC<MapProps> = ({ mapCenterReasonTxt, center }) => {
    const mapRef = useRef<L.Map | null>(null);
    
    // Use useEffect to update the map view when the center prop changes
    useEffect(() => {
        if (mapRef.current && center) {
            // You can use either setView or flyTo depending on your preference
            //mapRef.current.setView(center as L.LatLngExpression, 9); // 12 is the zoom level
            mapRef.current.flyTo(center as L.LatLngExpression, 9);
        }
    }, [center]);

    return (
        <MapContainer 
            center={center as L.LatLngExpression || [32.1652613142917, -54.72682487791673]} 
            zoom={center ? 4 : 2} 
            //viewreset
            
            scrollWheelZoom={false} 
            className="h-[35vh] rounded-lg"
            trackResize={true}
            ref={mapRef}
        >
            <TileLayer
                maxZoom={19}
                url={url}
                attribution={attribution}
            />
            {center && (
                <Marker position={center as L.LatLngExpression}>
                    <Popup>
                        {mapCenterReasonTxt}
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    )
}

export default Map;