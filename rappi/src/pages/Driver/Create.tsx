import React, { useState } from 'react';
import { Driver } from '../../models/driver';
import { createDriver } from '../../services/driverService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const DriverForm: React.FC<{ handleCreate: (driver: Omit<Driver, 'id'>) => void }> = ({ handleCreate }) => {
    const [name, setName] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            name,
            license_number: licenseNumber,
            email,
            phone,
            status,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Crear Nuevo Conductor</h3>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Nombre</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el nombre"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Número de Licencia</label>
                <input
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el número de licencia"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Correo Electrónico</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el correo electrónico"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Teléfono</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el teléfono"
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
                />
            </div>
            <button
                type="submit"
                className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
            >
                Crear Conductor
            </button>
        </form>
    );
};

const CreateDriverPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateDriver = async (driver: Omit<Driver, 'id'>) => {
        try {
            const createdDriver = await createDriver(driver);
            if (createdDriver) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el conductor',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Conductor creado con éxito:', createdDriver);
                navigate('/driver/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el conductor',
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
                text: 'Existe un problema al momento de crear el conductor',
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
            <h2>Crear Conductor</h2>
            <Breadcrumb pageName="Crear Conductor" />
            <DriverForm handleCreate={handleCreateDriver} />
        </div>
    );
};

export default CreateDriverPage;
