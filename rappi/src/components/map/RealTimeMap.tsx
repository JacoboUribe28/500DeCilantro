// src/components/map/RealTimeMap.tsx
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import { getLastCoordinates } from "./../../services/trackingService";

const motoIcon = new L.Icon({
  iconUrl: "/moto.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

interface Props {
  plate: string;
}

const RealTimeMap = ({ plate }: Props) => {
  const [position, setPosition] = useState<[number, number]>([5.05, -75.49]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const coords = await getLastCoordinates(plate);
        if (coords?.lat && coords?.lng) {
          setPosition([coords.lat, coords.lng]);
        }
      } catch (err) {
        console.error("Error obteniendo coordenadas", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [plate]);

  return (
    <MapContainer center={position} zoom={15} style={{ height: "500px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={motoIcon} />
    </MapContainer>
  );
};

export default RealTimeMap;
