import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface SetViewOnClickProps {
  coords: [number, number];
}

const SetViewOnClick: React.FC<SetViewOnClickProps> = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(coords, 13);
  }, [coords, map]);

  return null;
};

export default SetViewOnClick;