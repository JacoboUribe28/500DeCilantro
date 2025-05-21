import React, { useState } from 'react';
import { Motorcycle } from '../../models/motorcycle';
import { createMotorcycle } from '../../services/motorcycleService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const MotorcycleForm: React.FC<{ handleCreate: (motorcycle: Omit<Motorcycle, 'id'>) => void }> = ({ handleCreate }) => {
    const [licensePlate, setLicensePlate] = useState('');
    const [brand, setBrand] = useState('');
    const [year, setYear] = useState('');
    const [status, setStatus] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            license_plate: licensePlate,
            brand,
            year: year ? Number(year) : undefined,
            status,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Crear Nueva Motocicleta</h3>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Placa</label>
                <input
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese la placa"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Marca</label>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese la marca"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Año</label>
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el año"
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
            <button
                type="submit"
                className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
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
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Motocicleta creada con éxito:', createdMotorcycle);
                navigate('/motorcycle/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear la motocicleta',
                    icon: 'error',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear la motocicleta',
                icon: 'error',
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
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
