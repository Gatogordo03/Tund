import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface CenterMapProps {
  coords: [number, number];
}

const CenterMap: React.FC<CenterMapProps> = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(coords, 13);
  }, [coords, map]);

  return null;
};

export default CenterMap;