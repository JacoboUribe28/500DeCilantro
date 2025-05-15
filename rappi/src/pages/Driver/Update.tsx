import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getDriverById, updateDriver } from "../../services/driverService";
import Swal from "sweetalert2";

import { Driver } from '../../models/driver';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateDriverPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [driver, setDriver] = useState<Driver | null>(null);

    useEffect(() => {
        const fetchDriver = async () => {
            if (!id) return;
            const driverData = await getDriverById(parseInt(id));
            setDriver(driverData);
        };

        fetchDriver();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDriver(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleUpdateDriver = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!driver || !driver.id) {
            Swal.fire({
                title: "Error",
                text: "Conductor no cargado correctamente.",
                icon: "error",
                timer: 3000
            });
            return;
        }

        try {
            const updated = await updateDriver(parseInt(driver.id), driver);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el conductor",
                    icon: "success",
                    timer: 3000
                });
                navigate("/drivers");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el conductor",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el conductor",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!driver) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Conductor" />
            <form onSubmit={handleUpdateDriver}>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={driver.name || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="license_number">Número de Licencia:</label>
                    <input
                        type="text"
                        id="license_number"
                        name="license_number"
                        value={driver.license_number || ''}
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
                        value={driver.email || ''}
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
                        value={driver.phone || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status">Estado:</label>
                    <select
                        id="status"
                        name="status"
                        value={driver.status || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un estado</option>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                        <option value="suspended">Suspendido</option>
                    </select>
                </div>
                <button type="submit">Actualizar Conductor</button>
            </form>
        </>
    );
};

export default UpdateDriverPage;
