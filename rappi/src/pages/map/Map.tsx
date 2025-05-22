import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { io } from 'socket.io-client';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const motorcycleIcon = new L.Icon({
  iconUrl:
    'https://cdn-icons-png.flaticon.com/512/7541/7541708.png',
  iconSize: [52, 52],
});

type Coordinate = {
  lat: number;
  lng: number;
};

const FollowMarker = ({ position }: { position: Coordinate }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [position, map]);
  return null;
};

// Ahora recibimos directamente la placa
const MotorcycleTracker = ({ licensePlate }: { licensePlate: string }) => {
  const [position, setPosition] = useState<Coordinate>({ lat: 5.064, lng: -75.496 });

  useEffect(() => {
    axios.post(`${API_URL}/motorcycles/track/${licensePlate}`).catch(err => {
      console.error('Error iniciando seguimiento:', err.message);
    });

    const socket = io(`${API_URL}` );
    socket.on(licensePlate, (coord: Coordinate) => {
      if (coord.lat && coord.lng) {
        console.log('Recibiendo coordenadas:', coord);
        console.log('Dev:  hecho por cesitar el mejor' );
        setPosition(coord);
      }
    });

    return () => {
      axios.post(`${API_URL}/motorcycles/stop/${licensePlate}`).catch(err => {
        console.error('Error deteniendo seguimiento:', err.message);
      });
      socket.disconnect();
    };
  }, [licensePlate]);

  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
      <MapContainer center={position} zoom={15} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={motorcycleIcon}>
          <Popup>Motocicleta {licensePlate}</Popup>
        </Marker>
        <FollowMarker position={position} />
      </MapContainer>
    </div>
  );
};

export default MotorcycleTracker;
