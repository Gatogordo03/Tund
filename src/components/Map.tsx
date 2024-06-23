import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AMenu from "./AMenu";
import MapEventHandler from "./MapEventHandler";
import SetViewOnClick from "./SetViewOnClick";
import BottomMenu from "./BottomMenu";
import CenterMap from "./CenterMap";
import BottomSheet from "./BottomSheet";
import { Business } from "./Business";
import "bootstrap/dist/css/bootstrap.min.css";
import './BottomMenu.css';

const businessIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-orange.png",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  shadowSize: [50, 64],
  shadowAnchor: [4, 62],
});

const businesses: Business[] = [
  {
    id: 1,
    name: "Cafetería Ejemplo",
    lat: 19.39611111,
    lng: -99.09194444,
    address: "123 Calle Principal, Ciudad Ejemplo",
  },
  {
    id: 2,
    name: "Restaurante Ejemplo",
    lat: 19.23501111,
    lng: -99.05142444,
    address: "456 Calle Principal, Ciudad Ejemplo",
  }
  // Seguir agregando negocios de prueba
];

const isMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

const Map: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
        setUserLocation([19.39611111, -99.09194444]); // Fallback location
      }
    );
  }, []);

  const handleMapClick = () => {
    console.log("Map clicked");
    setSelectedBusiness(null);
  };

  const handleBusinessSelect = (business: Business) => {
    setSelectedBusiness(business);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <MapContainer 
        center={userLocation || [19.39611111, -99.09194444]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={!isMobile()}  // Desactivar el control de zoom si es móvil
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && <SetViewOnClick coords={userLocation} />}
        <MapEventHandler onMapClick={handleMapClick} />
        {selectedBusiness && <CenterMap coords={[selectedBusiness.lat, selectedBusiness.lng]} />}
        {businesses.map(business => (
          <Marker 
            key={business.id} 
            position={[business.lat, business.lng]} 
            icon={businessIcon} 
            eventHandlers={{ click: () => handleBusinessSelect(business) }}
          />
        ))}
      </MapContainer>
      <BottomSheet height={400}>
        {selectedBusiness ? (
          <AMenu
            business={selectedBusiness}
            onClose={() => setSelectedBusiness(null)}
          />
        ) : (
          <BottomMenu 
            businesses={businesses} 
            onSelect={handleBusinessSelect} 
          />
        )}
      </BottomSheet>
    </div>
  );
};

export default Map;
