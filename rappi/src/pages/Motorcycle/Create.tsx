import React, { Component } from 'react';
import { Motorcycle } from '../../models/motorcycle';
import { createMotorcycle } from '../../services/motorcycleService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import MotorcycleFormValidate from '../../components/Motorcycles/MotorcycleFormValidate';

interface CreateMotorcyclePageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface CreateMotorcyclePageState {}

class CreateMotorcyclePage extends Component<CreateMotorcyclePageProps, CreateMotorcyclePageState> {
    constructor(props: CreateMotorcyclePageProps) {
        super(props);
    }

    handleCreateMotorcycle = async (motorcycle: Motorcycle) => {
        try {
            // Omitimos el ID que viene del formulario ya que se genera en el backend
            const { id, ...motorcycleData } = motorcycle;
            const createdMotorcycle = await createMotorcycle(motorcycleData);
            
            if (createdMotorcycle) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente la motocicleta',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Motocicleta creada con éxito:', createdMotorcycle);
                this.props.navigate('/motorcycle/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear la motocicleta',
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
                text: 'Existe un problema al momento de crear la motocicleta',
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
                <h2>Crear Motocicleta</h2>
                <Breadcrumb pageName="Crear Motocicleta" />
                <MotorcycleFormValidate 
                    mode={1} // 1 = Modo creación
                    handleCreate={this.handleCreateMotorcycle}
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

export default withRouter(CreateMotorcyclePage);
