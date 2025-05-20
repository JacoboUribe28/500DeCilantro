import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Address } from '../../models/address';
import { createAddress } from '../../services/addressService';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const AddressForm: React.FC<{ handleCreate: (address: Omit<Address, 'id'>) => void }> = ({ handleCreate }) => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [orderId, setOrderId] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            street,
            city,
            state,
            postal_code: postalCode,
            additional_info: additionalInfo,
            order_id: orderId,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Crear Nueva Dirección</h3>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Calle</label>
                <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese la calle"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Ciudad</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese la ciudad"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Estado</label>
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el estado"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Código postal</label>
                <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el código postal"
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Información adicional</label>
                <input
                    type="text"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese información adicional"
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Order ID</label>
                <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el Order ID"
                />
            </div>
            <button
                type="submit"
                className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
            >
                Crear Dirección
            </button>
        </form>
    );
};

const CreateAddressPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateAddress = async (address: Omit<Address, 'id'>) => {
        try {
            const createdAddress = await createAddress(address);
            if (createdAddress) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente la dirección',
                    icon: 'success',
                    timer: 3000,
                });
                console.log('Dirección creada con éxito:', createdAddress);
                navigate('/address/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear la dirección',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear la dirección',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Dirección</h2>
            <Breadcrumb pageName="Crear Dirección" />
            <AddressForm handleCreate={handleCreateAddress} />
        </div>
    );
};

export default CreateAddressPage;
