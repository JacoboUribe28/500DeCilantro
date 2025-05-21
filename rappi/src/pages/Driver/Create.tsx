import React, { Component } from 'react';
import { Driver } from '../../models/driver';
import { createDriver } from '../../services/driverService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import DriverFormValidate from '../../components/Drivers/DriverFormValidate';

interface CreateDriverPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface CreateDriverPageState {}

class CreateDriverPage extends Component<CreateDriverPageProps, CreateDriverPageState> {
    constructor(props: CreateDriverPageProps) {
        super(props);
    }

    handleCreateDriver = async (driver: Driver) => {
        try {
            // Omitimos el ID que viene del formulario ya que se genera en el backend
            const { id, ...driverData } = driver;
            const createdDriver = await createDriver(driverData);
            
            if (createdDriver) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el conductor',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Conductor creado con éxito:', createdDriver);
                this.props.navigate('/driver/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el conductor',
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
                text: 'Existe un problema al momento de crear el conductor',
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
                <h2>Crear Conductor</h2>
                <Breadcrumb pageName="Crear Conductor" />
                <DriverFormValidate 
                    mode={1} // 1 = Modo creación
                    handleCreate={this.handleCreateDriver}
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

export default withRouter(CreateDriverPage);
