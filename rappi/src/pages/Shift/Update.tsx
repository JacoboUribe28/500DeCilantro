import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getShiftById, updateShift } from "../../services/shiftService";
import Swal from "sweetalert2";

import { Shift } from '../../models/shift';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateShiftPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [shift, setShift] = useState<Shift | null>(null);

    useEffect(() => {
        const fetchShift = async () => {
            if (!id) return;
            const shiftData = await getShiftById(parseInt(id));
            setShift(shiftData);
        };

        fetchShift();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setShift(prev => ({
            ...prev,
            [name]: name === 'driver_id' || name === 'motorcycle_id' ? Number(value) : value
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShift(prev => ({
            ...prev,
            [name]: value ? new Date(value) : undefined,
        }));
    };

    const handleUpdateShift = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!shift || !shift.id) {
            Swal.fire({
                title: "Error",
                text: "Turno no cargado correctamente.",
                icon: "error",
                timer: 3000
            });
            return;
        }

        try {
            const updated = await updateShift(parseInt(shift.id), shift);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el turno",
                    icon: "success",
                    timer: 3000
                });
                navigate("/shifts");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el turno",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el turno",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!shift) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Turno" />
            <form onSubmit={handleUpdateShift}>
                <div>
                    <label htmlFor="start_time">Hora de inicio:</label>
                    <input
                        type="datetime-local"
                        id="start_time"
                        name="start_time"
                        value={shift.start_time ? new Date(shift.start_time).toISOString().slice(0, 16) : ''}
                        onChange={handleDateChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="end_time">Hora de fin:</label>
                    <input
                        type="datetime-local"
                        id="end_time"
                        name="end_time"
                        value={shift.end_time ? new Date(shift.end_time).toISOString().slice(0, 16) : ''}
                        onChange={handleDateChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status">Estado:</label>
                    <select
                        id="status"
                        name="status"
                        value={shift.status || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un estado</option>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                        <option value="completed">Completado</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="driver_id">ID del conductor:</label>
                    <input
                        type="number"
                        id="driver_id"
                        name="driver_id"
                        value={shift.driver_id ?? ''}
                        onChange={handleChange}
                        required
                        min={1}
                    />
                </div>
                <div>
                    <label htmlFor="motorcycle_id">ID de la motocicleta:</label>
                    <input
                        type="number"
                        id="motorcycle_id"
                        name="motorcycle_id"
                        value={shift.motorcycle_id ?? ''}
                        onChange={handleChange}
                        required
                        min={1}
                    />
                </div>
                <button type="submit">Actualizar Turno</button>
            </form>
        </>
    );
};

export default UpdateShiftPage;
