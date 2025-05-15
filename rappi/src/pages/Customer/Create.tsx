import React, { useState } from 'react';
import { Customer } from '../../models/customer';
import { createCustomer } from '../../services/customerService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const CustomerForm: React.FC<{ handleCreate: (customer: Omit<Customer, 'id'>) => void }> = ({ handleCreate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            name,
            email,
            phone,
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
                <label className="block mb-1 font-semibold">Correo Electrónico</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
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
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Crear Cliente
            </button>
        </form>
    );
};

const CreateCustomerPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateCustomer = async (customer: Omit<Customer, 'id'>) => {
        try {
            const createdCustomer = await createCustomer(customer);
            if (createdCustomer) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el cliente',
                    icon: 'success',
                    timer: 3000,
                });
                console.log('Cliente creado con éxito:', createdCustomer);
                navigate('/customers');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el cliente',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear el cliente',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Cliente</h2>
            <Breadcrumb pageName="Crear Cliente" />
            <CustomerForm handleCreate={handleCreateCustomer} />
        </div>
    );
};

export default CreateCustomerPage;
