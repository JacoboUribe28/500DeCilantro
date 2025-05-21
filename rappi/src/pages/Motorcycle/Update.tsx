import React, { Component } from 'react';
import { Motorcycle } from '../../models/motorcycle';
import { getMotorcycleById, updateMotorcycle } from '../../services/motorcycleService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import MotorcycleFormValidate from '../../components/Motorcycles/MotorcycleFormValidate';

interface UpdateMotorcyclePageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface UpdateMotorcyclePageState {
    motorcycle: Motorcycle | null;
    loading: boolean;
    error: string | null;
}

class UpdateMotorcyclePage extends Component<UpdateMotorcyclePageProps, UpdateMotorcyclePageState> {
    constructor(props: UpdateMotorcyclePageProps) {
        super(props);
        this.state = {
            motorcycle: null,
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
                    error: 'No se proporcionó un ID de motocicleta' 
                });
                return;
            }

            const motorcycle = await getMotorcycleById(id);
            if (motorcycle) {
                this.setState({ motorcycle, loading: false });
            } else {
                this.setState({ 
                    loading: false, 
                    error: 'No se encontró la motocicleta con el ID proporcionado' 
                });
            }
        } catch (error) {
            this.setState({ 
                loading: false, 
                error: 'Error al cargar los datos de la motocicleta' 
            });
        }
    }

    handleUpdateMotorcycle = async (motorcycle: Motorcycle) => {
        try {
            const updatedMotorcycle = await updateMotorcycle(motorcycle.id || '', motorcycle);
            
            if (updatedMotorcycle) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha actualizado correctamente la motocicleta',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Motocicleta actualizada con éxito:', updatedMotorcycle);
                this.props.navigate('/motorcycle/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de actualizar la motocicleta',
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
                text: 'Existe un problema al momento de actualizar la motocicleta',
                icon: 'error',
                timer: 3000,
                customClass:{
                    confirmButton: 'text-black'
                }
            });
        }
    };

    render() {
        const { motorcycle, loading, error } = this.state;

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
                <h2>Actualizar Motocicleta</h2>
                <Breadcrumb pageName="Actualizar Motocicleta" />
                <MotorcycleFormValidate 
                    mode={2} // 2 = Modo actualización
                    handleUpdate={this.handleUpdateMotorcycle}
                    motorcycle={motorcycle}
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

export default withRouter(UpdateMotorcyclePage);
