import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getMotorcycleById, updateMotorcycle } from "../../services/motorcycleService";
import Swal from "sweetalert2";

import { Motorcycle } from '../../models/motorcycle';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateMotorcyclePage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);

    useEffect(() => {
        const fetchMotorcycle = async () => {
            if (!id) return;
            const motorcycleData = await getMotorcycleById(parseInt(id));
            setMotorcycle(motorcycleData);
        };

        fetchMotorcycle();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setMotorcycle(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleUpdateMotorcycle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!motorcycle || !motorcycle.id) {
            Swal.fire({
                title: "Error",
                text: "Motocicleta no cargada correctamente.",
                icon: "error",
                timer: 3000
            });
            return;
        }

        try {
            const updated = await updateMotorcycle(parseInt(motorcycle.id), motorcycle);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente la motocicleta",
                    icon: "success",
                    timer: 3000
                });
                navigate("/motorcycles");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar la motocicleta",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar la motocicleta",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!motorcycle) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Motocicleta" />
            <form onSubmit={handleUpdateMotorcycle}>
                <div>
                    <label htmlFor="license_plate">Placa:</label>
                    <input
                        type="text"
                        id="license_plate"
                        name="license_plate"
                        value={motorcycle.license_plate || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="brand">Marca:</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={motorcycle.brand || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="year">Año:</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={motorcycle.year || ''}
                        onChange={handleChange}
                        required
                        min={1900}
                        max={new Date().getFullYear()}
                    />
                </div>
                <div>
                    <label htmlFor="status">Estado:</label>
                    <select
                        id="status"
                        name="status"
                        value={motorcycle.status || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un estado</option>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                        <option value="maintenance">Mantenimiento</option>
                    </select>
                </div>
                <button type="submit">Actualizar Motocicleta</button>
            </form>
        </>
    );
};

export default UpdateMotorcyclePage;
