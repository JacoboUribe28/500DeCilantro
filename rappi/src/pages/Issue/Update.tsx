import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getIssueById, updateIssue } from "../../services/issueService";
import Swal from "sweetalert2";

import { Issue } from '../../models/issue';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateIssuePage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [issue, setIssue] = useState<Issue | null>(null);

    useEffect(() => {
        const fetchIssue = async () => {
            if (!id) return;
            const issueData = await getIssueById(parseInt(id));
            setIssue(issueData);
        };

        fetchIssue();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setIssue(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setIssue(prev => ({
            ...prev,
            [name]: value ? new Date(value) : undefined,
        }));
    };

    const handleUpdateIssue = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!issue || !issue.id) {
            Swal.fire({
                title: "Error",
                text: "Issue no cargado correctamente.",
                icon: "error",
                timer: 3000
            });
            return;
        }

        try {
            const updated = await updateIssue(parseInt(issue.id), issue);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el issue",
                    icon: "success",
                    timer: 3000
                });
                navigate("/issues");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el issue",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el issue",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!issue) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Issue" />
            <form onSubmit={handleUpdateIssue}>
                <div>
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={issue.description || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="issue_type">Tipo de Issue:</label>
                    <input
                        type="text"
                        id="issue_type"
                        name="issue_type"
                        value={issue.issue_type || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date_reported">Fecha Reportada:</label>
                    <input
                        type="datetime-local"
                        id="date_reported"
                        name="date_reported"
                        value={issue.date_reported ? new Date(issue.date_reported).toISOString().slice(0, 16) : ''}
                        onChange={handleDateChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status">Estado:</label>
                    <select
                        id="status"
                        name="status"
                        value={issue.status || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un estado</option>
                        <option value="open">Abierto</option>
                        <option value="in_progress">En Progreso</option>
                        <option value="closed">Cerrado</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="motorcycle_id">ID de Motocicleta:</label>
                    <input
                        type="number"
                        id="motorcycle_id"
                        name="motorcycle_id"
                        value={issue.motorcycle_id ?? ''}
                        onChange={handleChange}
                        required
                        min={1}
                    />
                </div>
                <button type="submit">Actualizar Issue</button>
            </form>
        </>
    );
};

export default UpdateIssuePage;
