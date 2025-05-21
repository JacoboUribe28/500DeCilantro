import React, { Component } from 'react';
import { Shift } from '../../models/shift';
import { getShiftById, updateShift } from '../../services/shiftService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import ShiftFormValidate from '../../components/Shifts/ShiftFormValidate';

interface UpdateShiftPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface UpdateShiftPageState {
    shift: Shift | null;
    loading: boolean;
    error: string | null;
}

class UpdateShiftPage extends Component<UpdateShiftPageProps, UpdateShiftPageState> {
    constructor(props: UpdateShiftPageProps) {
        super(props);
        this.state = {
            shift: null,
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
                    error: 'No se proporcionó un ID de turno' 
                });
                return;
            }

            const shift = await getShiftById(id);
            if (shift) {
                this.setState({ shift, loading: false });
            } else {
                this.setState({ 
                    loading: false, 
                    error: 'No se encontró el turno con el ID proporcionado' 
                });
            }
        } catch (error) {
            this.setState({ 
                loading: false, 
                error: 'Error al cargar los datos del turno' 
            });
        }
    }

    handleUpdateShift = async (shift: Shift) => {
        try {
            const updatedShift = await updateShift(shift.id || '', shift);
            
            if (updatedShift) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha actualizado correctamente el turno',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Turno actualizado con éxito:', updatedShift);
                this.props.navigate('/shift/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de actualizar el turno',
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
                text: 'Existe un problema al momento de actualizar el turno',
                icon: 'error',
                timer: 3000,
                customClass:{
                    confirmButton: 'text-black'
                }
            });
        }
    };

    render() {
        const { shift, loading, error } = this.state;

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
                <h2>Actualizar Turno</h2>
                <Breadcrumb pageName="Actualizar Turno" />
                <ShiftFormValidate 
                    mode={2} // 2 = Modo actualización
                    handleUpdate={this.handleUpdateShift}
                    shift={shift}
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

export default withRouter(UpdateShiftPage);
