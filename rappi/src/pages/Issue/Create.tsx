import React, { useState } from 'react';
import { Issue } from '../../models/issue';
import { createIssue } from '../../services/issueService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const IssueForm: React.FC<{ handleCreate: (issue: Omit<Issue, 'id'>) => void }> = ({ handleCreate }) => {
    const [description, setDescription] = useState('');
    const [issueType, setIssueType] = useState('');
    const [dateReported, setDateReported] = useState('');
    const [status, setStatus] = useState('');
    const [motorcycleId, setMotorcycleId] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            description,
            issue_type: issueType,
            date_reported: dateReported ? new Date(dateReported) : undefined,
            status,
            motorcycle_id: motorcycleId ? Number(motorcycleId) : undefined,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Crear Nuevo Issue</h3>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Descripción</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese la descripción"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Tipo de Issue</label>
                <input
                    type="text"
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el tipo de issue"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Fecha Reportada</label>
                <input
                    type="date"
                    value={dateReported}
                    onChange={(e) => setDateReported(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Estado</label>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el estado"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">ID de Motocicleta</label>
                <input
                    type="number"
                    value={motorcycleId}
                    onChange={(e) => setMotorcycleId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el ID de la motocicleta"
                />
            </div>
            <button
                type="submit"
                className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
            >
                Crear Issue
            </button>
        </form>
    );
};

const CreateIssuePage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateIssue = async (issue: Omit<Issue, 'id'>) => {
        try {
            const createdIssue = await createIssue(issue);
            if (createdIssue) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el issue',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Issue creado con éxito:', createdIssue);
                navigate('/issue/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el issue',
                    icon: 'error',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear el issue',
                icon: 'error',
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
        }
    };

    return (
        <div>
            <h2>Crear Issue</h2>
            <Breadcrumb pageName="Crear Issue" />
            <IssueForm handleCreate={handleCreateIssue} />
        </div>
    );
};

export default CreateIssuePage;
