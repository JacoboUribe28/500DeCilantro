import React, { useState } from 'react';
import { Address } from '../../models/address';
import { createAddress } from '../../services/addressService';
import Swal from 'sweetalert2';
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
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
            <div>
                <label className="block mb-1 font-semibold">Calle</label>
                <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Ciudad</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Estado</label>
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Código postal</label>
                <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Información adiccional</label>
                <input
                    type="text"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Order ID</label>
                <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
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
                navigate('/address');
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
