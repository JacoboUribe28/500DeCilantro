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
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
            <div>
                <label className="block mb-1 font-semibold">Nombre</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Número de Licencia</label>
                <input
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Correo Electrónico</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Teléfono</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border rounded px-3 py-2"
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
                });
                console.log('Conductor creado con éxito:', createdDriver);
                navigate('/drivers');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el conductor',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear el conductor',
                icon: 'error',
                timer: 3000,
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
