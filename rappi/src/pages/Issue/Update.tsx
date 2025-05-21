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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setIssue(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleUpdateIssue = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!issue || !issue.id) {
            Swal.fire({
                title: "Error",
                text: "Problema no cargado correctamente.",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
            return;
        }

        try {
            const updated = await updateIssue(parseInt(issue.id), issue);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el problema",
                    icon: "success",
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                navigate("/issue/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el problema",
                    icon: "error",
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el problema",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
        }
    };

    if (!issue) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Problema" />
            <div className="flex flex-col gap-9 bg-blue-100">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
                    <h3 className="font-medium text-black dark:text-white mb-6 text-lg">
                        Actualizar Problema
                    </h3>
                    <form onSubmit={handleUpdateIssue} className="flex flex-col gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Descripción:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={issue.description || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="issue_type" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tipo de Problema:
                            </label>
                            <input
                                type="text"
                                id="issue_type"
                                name="issue_type"
                                value={issue.issue_type || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="date_reported" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Fecha Reportada:
                            </label>
                            <input
                                type="date"
                                id="date_reported"
                                name="date_reported"
                                value={issue.date_reported ? new Date(issue.date_reported).toISOString().substring(0, 10) : ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="status" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Estado:
                            </label>
                            <input
                                type="text"
                                id="status"
                                name="status"
                                value={issue.status || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="motorcycle_id" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                ID de Motocicleta:
                            </label>
                            <input
                                type="number"
                                id="motorcycle_id"
                                name="motorcycle_id"
                                value={issue.motorcycle_id !== undefined ? issue.motorcycle_id : ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90"
                        >
                            Actualizar Problema
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/issue/list")}
                            className="mt-2 inline-block rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                        >
                            Volver a la lista
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateIssuePage;
