import React, { Component } from 'react';
import { Issue } from '../../models/issue';
import { createIssue } from '../../services/issueService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import IssueFormValidate from '../../components/Issues/IssueFormValidate';

interface CreateIssuePageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface CreateIssuePageState {}

class CreateIssuePage extends Component<CreateIssuePageProps, CreateIssuePageState> {
    constructor(props: CreateIssuePageProps) {
        super(props);
    }

    handleCreateIssue = async (issue: Issue) => {
        try {
            // Omitimos el ID que viene del formulario ya que se genera en el backend
            const { id, ...issueData } = issue;
            const createdIssue = await createIssue(issueData);
            
            if (createdIssue) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el problema',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Problema creado con éxito:', createdIssue);
                this.props.navigate('/issue/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el problema',
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
                text: 'Existe un problema al momento de crear el problema',
                icon: 'error',
                timer: 3000,
                customClass:{
                    confirmButton: 'text-black'
                }
            });
        }
    };

    render() {
        return (
            <div>
                <h2>Crear Problema</h2>
                <Breadcrumb pageName="Crear Problema" />
                <IssueFormValidate 
                    mode={1} // 1 = Modo creación
                    handleCreate={this.handleCreateIssue}
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

export default withRouter(CreateIssuePage);
