// src/pages/TrackingPage.tsx
import { useState } from "react";
import { startTracking } from "../../services/trackingService";
import RealTimeMap from "../../components/map/RealTimeMap";

const TrackingPage = () => {
  const [tracking, setTracking] = useState(false);
  const [plate] = useState("ABC124");

  const handleStart = async () => {
    try {
      await startTracking(plate);
      setTracking(true);
    } catch (err) {
      alert("No se pudo iniciar rastreo");
    }
  };

  return (
    <div className="p-4">
      <button onClick={handleStart} className="bg-blue-500 text-white px-4 py-2 rounded">
        Iniciar Rastreo
      </button>

      {tracking && <RealTimeMap plate={plate} />}
    </div>
  );
};

export default TrackingPage;
