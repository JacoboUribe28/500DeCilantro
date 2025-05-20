import React, { useState } from 'react';
import { Shift } from '../../models/shift';
import { createShift } from '../../services/shiftService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const ShiftForm: React.FC<{ handleCreate: (shift: Omit<Shift, 'id'>) => void }> = ({ handleCreate }) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [status, setStatus] = useState('');
    const [driverId, setDriverId] = useState('');
    const [motorcycleId, setMotorcycleId] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            start_time: startTime ? new Date(startTime) : undefined,
            end_time: endTime ? new Date(endTime) : undefined,
            status,
            driver_id: driverId ? Number(driverId) : undefined,
            motorcycle_id: motorcycleId ? Number(motorcycleId) : undefined,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Crear Nuevo Turno</h3>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Hora de Inicio</label>
                <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Hora de Fin</label>
                <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Estado</label>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el estado"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">ID del Conductor</label>
                <input
                    type="number"
                    value={driverId}
                    onChange={(e) => setDriverId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el ID del conductor"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">ID de la Motocicleta</label>
                <input
                    type="number"
                    value={motorcycleId}
                    onChange={(e) => setMotorcycleId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el ID de la motocicleta"
                    required
                />
            </div>
            <button
                type="submit"
                className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
            >
                Crear Turno
            </button>
        </form>
    );
};

const CreateShiftPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateShift = async (shift: Omit<Shift, 'id'>) => {
        try {
            const createdShift = await createShift(shift);
            if (createdShift) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el turno',
                    icon: 'success',
                    timer: 3000,
                });
                console.log('Turno creado con éxito:', createdShift);
                navigate('/shift/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el turno',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear el turno',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Turno</h2>
            <Breadcrumb pageName="Crear Turno" />
            <ShiftForm handleCreate={handleCreateShift} />
        </div>
    );
};

export default CreateShiftPage;
