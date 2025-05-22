import React from 'react';
import MotorcycleTracker from '../map/Map'; // Asegúrate de que esta ruta coincida con tu estructura de carpetas

const MotorcycleTrackingPage = () => {
  const licensePlate = 'ABC124';

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seguimiento de Motocicleta</h1>
      <MotorcycleTracker licensePlate={licensePlate} />
    </div>
  );
};

export default MotorcycleTrackingPage;
