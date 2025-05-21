import React, { Component } from 'react';
import { Issue } from '../../models/issue';
import { getIssueById, updateIssue } from '../../services/issueService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import IssueFormValidate from '../../components/Issues/IssueFormValidate';

interface UpdateIssuePageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface UpdateIssuePageState {
    issue: Issue | null;
    loading: boolean;
    error: string | null;
}

class UpdateIssuePage extends Component<UpdateIssuePageProps, UpdateIssuePageState> {
    constructor(props: UpdateIssuePageProps) {
        super(props);
        this.state = {
            issue: null,
            loading: true,
            error: null
        };
    }

    async componentDidMount() {
        try {
            const { id } = this.props.params;
            if (!id) {
                this.setState({ 
                    loading: false, 
                    error: 'No se proporcionó un ID de incidencia' 
                });
                return;
            }

            const issue = await getIssueById(id);
            if (issue) {
                this.setState({ issue, loading: false });
            } else {
                this.setState({ 
                    loading: false, 
                    error: 'No se encontró la incidencia con el ID proporcionado' 
                });
            }
        } catch (error) {
            this.setState({ 
                loading: false, 
                error: 'Error al cargar los datos de la incidencia' 
            });
        }
    }

    handleUpdateIssue = async (issue: Issue) => {
        try {
            const updatedIssue = await updateIssue(issue.id || '', issue);
            
            if (updatedIssue) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha actualizado correctamente la incidencia',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Incidencia actualizada con éxito:', updatedIssue);
                this.props.navigate('/issue/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de actualizar la incidencia',
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
                text: 'Existe un problema al momento de actualizar la incidencia',
                icon: 'error',
                timer: 3000,
                customClass:{
                    confirmButton: 'text-black'
                }
            });
        }
    };

    render() {
        const { issue, loading, error } = this.state;

        if (loading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            );
        }

        return (
            <div>
                <h2>Actualizar Incidencia</h2>
                <Breadcrumb pageName="Actualizar Incidencia" />
                <IssueFormValidate 
                    mode={2} // 2 = Modo actualización
                    handleUpdate={this.handleUpdateIssue}
                    issue={issue}
                />
            </div>
        );
    }
}

// Since react-router-dom v6 does not have withRouter, we create a wrapper to inject navigate
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let navigate = useNavigate();
        let params = useParams();
        let location = useLocation();
        return <Component {...props} navigate={navigate} params={params} location={location} />;
    }
    return ComponentWithRouterProp;
}

export default withRouter(UpdateIssuePage);
