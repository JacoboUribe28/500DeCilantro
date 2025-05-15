import React, { useState } from 'react';
import { Motorcycle } from '../../models/motorcycle';
import { createMotorcycle } from '../../services/motorcycleService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const MotorcycleForm: React.FC<{ handleCreate: (motorcycle: Omit<Motorcycle, 'id'>) => void }> = ({ handleCreate }) => {
    const [licensePlate, setLicensePlate] = useState('');
    const [brand, setBrand] = useState('');
    const [year, setYear] = useState<number | ''>('');
    const [status, setStatus] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            license_plate: licensePlate,
            brand,
            year: year === '' ? undefined : year,
            status,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
            <div>
                <label className="block mb-1 font-semibold">Placa</label>
                <input
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Marca</label>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Año</label>
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                    min={1900}
                    max={new Date().getFullYear()}
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Estado</label>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Crear Motocicleta
            </button>
        </form>
    );
};

const CreateMotorcyclePage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateMotorcycle = async (motorcycle: Omit<Motorcycle, 'id'>) => {
        try {
            const createdMotorcycle = await createMotorcycle(motorcycle);
            if (createdMotorcycle) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente la motocicleta',
                    icon: 'success',
                    timer: 3000,
                });
                console.log('Motocicleta creada con éxito:', createdMotorcycle);
                navigate('/motorcycles');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear la motocicleta',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear la motocicleta',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Motocicleta</h2>
            <Breadcrumb pageName="Crear Motocicleta" />
            <MotorcycleForm handleCreate={handleCreateMotorcycle} />
        </div>
    );
};

export default CreateMotorcyclePage;
