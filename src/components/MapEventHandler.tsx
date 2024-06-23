import React from 'react';
import { useMapEvents } from 'react-leaflet';

interface MapEventHandlerProps {
  onMapClick: () => void;
}

const MapEventHandler: React.FC<MapEventHandlerProps> = ({ onMapClick }) => {
  useMapEvents({
    click: () => {
      onMapClick();
    },
  });

  return null;
};

export default MapEventHandler;