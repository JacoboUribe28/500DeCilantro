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
    const [motorcycleId, setMotorcycleId] = useState<number | ''>('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            description,
            issue_type: issueType,
            date_reported: dateReported ? new Date(dateReported) : undefined,
            status,
            motorcycle_id: motorcycleId === '' ? undefined : motorcycleId,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
            <div>
                <label className="block mb-1 font-semibold">Descripción</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Tipo de Incidencia</label>
                <input
                    type="text"
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Fecha Reportada</label>
                <input
                    type="date"
                    value={dateReported}
                    onChange={(e) => setDateReported(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Estado</label>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">ID de Motocicleta</label>
                <input
                    type="number"
                    value={motorcycleId}
                    onChange={(e) => setMotorcycleId(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Crear Incidencia
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
                    text: 'Se ha creado correctamente la incidencia',
                    icon: 'success',
                    timer: 3000,
                });
                console.log('Incidencia creada con éxito:', createdIssue);
                navigate('/issues');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear la incidencia',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear la incidencia',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Incidencia</h2>
            <Breadcrumb pageName="Crear Incidencia" />
            <IssueForm handleCreate={handleCreateIssue} />
        </div>
    );
};

export default CreateIssuePage;
