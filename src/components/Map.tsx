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
import { Business, businesses } from "./Business";
import "bootstrap/dist/css/bootstrap.min.css";

const businessIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-orange.png",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  shadowSize: [50, 64],
  shadowAnchor: [4, 62],
});

const userLocationIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  shadowSize: [50, 64],
  shadowAnchor: [4, 62],
});

const Map: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

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
    setBottomSheetOpen(false);
  };

  const handleBusinessSelect = (business: Business) => {
    setSelectedBusiness(business);
    setBottomSheetOpen(true);
  };

  const handleBottomSheetToggle = (isOpen: boolean) => {
    setBottomSheetOpen(isOpen);
  };

  const handleExpand = () => {
    setBottomSheetOpen(true);
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      <div style={{ height: "85vh", position: "relative" }}>
        <MapContainer
          center={userLocation || [19.39611111, -99.09194444]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false} // Quitar el control de zoom
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {userLocation && <SetViewOnClick coords={userLocation} />}
          {userLocation && (
            <Marker position={userLocation} icon={userLocationIcon} />
          )}
          <MapEventHandler onMapClick={handleMapClick} />
          {selectedBusiness && (
            <CenterMap coords={[selectedBusiness.lat, selectedBusiness.lng]} />
          )}
          {businesses.map((business) => (
            <Marker
              key={business.id}
              position={[business.lat, business.lng]}
              icon={businessIcon}
              eventHandlers={{ click: () => handleBusinessSelect(business) }}
            />
          ))}
        </MapContainer>
      </div>
      <BottomSheet
        initialHeight={150}
        midHeight={window.innerHeight * 0.5}
        expandedHeight={window.innerHeight}
        isOpen={bottomSheetOpen}
        onToggle={handleBottomSheetToggle}
      >
        {selectedBusiness ? (
          <AMenu
            business={selectedBusiness}
            onClose={() => {
              setSelectedBusiness(null);
              setBottomSheetOpen(false);
            }}
            onExpand={handleExpand}
          />
        ) : (
          <BottomMenu businesses={businesses} onSelect={handleBusinessSelect} />
        )}
      </BottomSheet>
    </div>
  );
};

export default Map;
