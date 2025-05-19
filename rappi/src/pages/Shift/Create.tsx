import React, { useState } from 'react';
import { Shift } from '../../models/shift';
import { createShift } from '../../services/shiftService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const CreateShift = () => {
    const navigate = useNavigate();

    const [shift, setShift] = useState<Omit<Shift, 'id'>>({
        start_time: undefined,
        end_time: undefined,
        status: '',
        driver_id: undefined,
        motorcycle_id: undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setShift(prev => ({
            ...prev,
            [name]: name === 'driver_id' || name === 'motorcycle_id' ? (value ? parseInt(value) : undefined) : value,
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShift(prev => ({
            ...prev,
            [name]: value ? new Date(value) : undefined,
        }));
    };

    const handleCreateShift = async () => {
        // Validate required fields
        if (!shift.start_time || !shift.end_time || !shift.status || !shift.driver_id || !shift.motorcycle_id) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor complete todos los campos obligatorios.',
                icon: 'error',
                timer: 3000,
            });
            return;
        }

        try {
            const createdShift = await createShift(shift);
            if (createdShift) {
                Swal.fire({
                    title: 'Completado',
                    text: 'El turno se ha creado correctamente.',
                    icon: 'success',
                    timer: 3000,
                });
                navigate('/shifts');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el turno.',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear el turno.',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Turno</h2>
            <Breadcrumb pageName="Crear Turno" />
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleCreateShift();
                }}
            >
                <div>
                    <label htmlFor="start_time">Hora de inicio:</label>
                    <input
                        type="datetime-local"
                        id="start_time"
                        name="start_time"
                        value={shift.start_time ? shift.start_time.toISOString().slice(0, 16) : ''}
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
                        value={shift.end_time ? shift.end_time.toISOString().slice(0, 16) : ''}
                        onChange={handleDateChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status">Estado:</label>
                    <select
                        id="status"
                        name="status"
                        value={shift.status}
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
                <button type="submit">Crear Turno</button>
            </form>
        </div>
    );
};

export default CreateShift;
