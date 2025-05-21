import React, { Component } from 'react';
import { Shift } from '../../models/shift';
import { createShift } from '../../services/shiftService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import ShiftFormValidate from '../../components/Shifts/ShiftFormValidate';

interface CreateShiftPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface CreateShiftPageState {}

class CreateShiftPage extends Component<CreateShiftPageProps, CreateShiftPageState> {
    constructor(props: CreateShiftPageProps) {
        super(props);
    }

    handleCreateShift = async (shift: Shift) => {
        try {
            // Omitimos el ID que viene del formulario ya que se genera en el backend
            const { id, ...shiftData } = shift;
            const createdShift = await createShift(shiftData);
            
            if (createdShift) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el turno',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Turno creado con éxito:', createdShift);
                this.props.navigate('/shift/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el turno',
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
                text: 'Existe un problema al momento de crear el turno',
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
                <h2>Crear Turno</h2>
                <Breadcrumb pageName="Crear Turno" />
                <ShiftFormValidate 
                    mode={1} // 1 = Modo creación
                    handleCreate={this.handleCreateShift}
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

export default withRouter(CreateShiftPage);
