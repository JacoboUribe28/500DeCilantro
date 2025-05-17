import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getAddressById, updateAddress } from "../../services/addressService";
import Swal from "sweetalert2";

import { Address } from '../../models/address';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateAddressPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [address, setAddress] = useState<Address | null>(null);

    useEffect(() => {
        const fetchAddress = async () => {
            if (!id) return;
            const addressData = await getAddressById(parseInt(id));
            setAddress(addressData);
        };

        fetchAddress();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAddress(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleUpdateAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address || !address.id) {
            Swal.fire({
                title: "Error",
                text: "Dirección no cargada correctamente.",
                icon: "error",
                timer: 3000
            });
            return;
        }

        try {
            const updated = await updateAddress(parseInt(address.id), address);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente la dirección",
                    icon: "success",
                    timer: 3000
                });
                navigate("/addresses");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar la dirección",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar la dirección",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!address) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Dirección" />
            <form onSubmit={handleUpdateAddress}>
                <div>
                    <label htmlFor="street">Calle:</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={address.street || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">Ciudad:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={address.city || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="state">Estado:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={address.state || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="postal_code">Código Postal:</label>
                    <input
                        type="text"
                        id="postal_code"
                        name="postal_code"
                        value={address.postal_code || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="additional_info">Información Adicional:</label>
                    <textarea
                        id="additional_info"
                        name="additional_info"
                        value={address.additional_info || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="order_id">ID de Pedido:</label>
                    <input
                        type="text"
                        id="order_id"
                        name="order_id"
                        value={address.order_id || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar Dirección</button>
            </form>
        </>
    );
};

export default UpdateAddressPage;
