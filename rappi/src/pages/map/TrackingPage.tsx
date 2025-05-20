import { useState } from "react";
import MotorcycleMap from "../../components/map/MotorcycleMap";

import {
  startTracking,
  stopTracking,
} from "../../services/motorcycleService";

const TrackingPage = () => {
  const [loading, setLoading] = useState(false);
  const [trackingActive, setTrackingActive] = useState(false); // ✅ Nuevo estado
  const licensePlate = "ABC124";

  const handleStart = async () => {
    setLoading(true);
    try {
      await startTracking(licensePlate, 5.0553, -75.4906);
      setTrackingActive(true); // ✅ Activar rastreo en el mapa
      alert("Rastreo iniciado");
    } catch (err) {
      console.error(err);
      alert("Error al iniciar rastreo");
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    setLoading(true);
    try {
      await stopTracking(licensePlate);
      setTrackingActive(false); // ✅ Detener rastreo en el mapa
      alert("Rastreo detenido");
    } catch (err) {
      console.error(err);
      alert("Error al detener rastreo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Seguimiento de Motocicleta</h2>
      <div className="flex gap-4">
        <button
          onClick={handleStart}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Iniciar rastreo
        </button>
        <button
          onClick={handleStop}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Detener rastreo
        </button>
      </div>
      <MotorcycleMap active={trackingActive} />
    </div>
  );
};

export default TrackingPage;
