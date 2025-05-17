import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getCustomerById, updateCustomer } from "../../services/customerService";
import Swal from "sweetalert2";

import { Customer } from '../../models/customer';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateCustomerPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            if (!id) return;
            const customerData = await getCustomerById(parseInt(id));
            setCustomer(customerData);
        };

        fetchCustomer();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleUpdateCustomer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!customer || !customer.id) {
            Swal.fire({
                title: "Error",
                text: "Cliente no cargado correctamente.",
                icon: "error",
                timer: 3000
            });
            return;
        }

        try {
            const updated = await updateCustomer(parseInt(customer.id), customer);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el cliente",
                    icon: "success",
                    timer: 3000
                });
                navigate("/customers");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el cliente",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el cliente",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!customer) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Cliente" />
            <form onSubmit={handleUpdateCustomer}>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={customer.name || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={customer.email || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={customer.phone || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar Cliente</button>
            </form>
        </>
    );
};

export default UpdateCustomerPage;
