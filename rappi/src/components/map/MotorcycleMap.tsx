import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { getMotorcycleLocation } from '../../services/motorcycleService';
import L from "leaflet";

// Icono personalizado de la moto
const motoIcon = new Icon({
  iconUrl: "/moto.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

// Componente interno: marcador que se mueve en tiempo real
const RealTimeMarker = ({
  licensePlate,
  active,
}: {
  licensePlate: string;
  active: boolean;
}) => {
  const [position, setPosition] = useState<LatLngExpression>([5.0553, -75.4906]);
  const markerRef = useRef<L.Marker | null>(null);
  const map = useMap();

  useEffect(() => {
    if (!active) return;

    const fetchLocation = async () => {
      const res = await getMotorcycleLocation(licensePlate);
      if (res) {
        const newPos: LatLngExpression = [res.lat, res.lng];
        setPosition(newPos);
        markerRef.current?.setLatLng(newPos);
        map.panTo(newPos);
      }
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 3000);
    return () => clearInterval(interval);
  }, [licensePlate, map, active]);

  return (
    <Marker
      position={position}
      icon={motoIcon}
      ref={(ref) => {
        markerRef.current = ref as L.Marker;
      }}
    />
  );
};

// Componente principal del mapa con marcador dinámico
const MotorcycleMap = ({ active }: { active: boolean }) => {
  const licensePlate = "ABC124";

  return (
    <MapContainer
      center={[5.0553, -75.4906]}
      zoom={15}
      scrollWheelZoom
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RealTimeMarker licensePlate={licensePlate} active={active} />
    </MapContainer>
  );
};

export default MotorcycleMap;
