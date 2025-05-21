import React, { Component } from 'react';
import { Customer } from '../../models/customer';
import { getCustomerById, updateCustomer } from '../../services/customerService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import CustomerFormValidate from '../../components/Customers/CustomerFormValidate';

interface UpdateCustomerPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface UpdateCustomerPageState {
    customer: Customer | null;
    loading: boolean;
    error: string | null;
}

class UpdateCustomerPage extends Component<UpdateCustomerPageProps, UpdateCustomerPageState> {
    constructor(props: UpdateCustomerPageProps) {
        super(props);
        this.state = {
            customer: null,
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
                    error: 'No se proporcionó un ID de cliente' 
                });
                return;
            }

            const customer = await getCustomerById(id);
            if (customer) {
                this.setState({ customer, loading: false });
            } else {
                this.setState({ 
                    loading: false, 
                    error: 'No se encontró el cliente con el ID proporcionado' 
                });
            }
        } catch (error) {
            this.setState({ 
                loading: false, 
                error: 'Error al cargar los datos del cliente' 
            });
        }
    }

    handleUpdateCustomer = async (customer: Customer) => {
        try {
            const updatedCustomer = await updateCustomer(customer.id || '', customer);
            
            if (updatedCustomer) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha actualizado correctamente el cliente',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Cliente actualizado con éxito:', updatedCustomer);
                this.props.navigate('/customer/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de actualizar el cliente',
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
                text: 'Existe un problema al momento de actualizar el cliente',
                icon: 'error',
                timer: 3000,
                customClass:{
                    confirmButton: 'text-black'
                }
            });
        }
    };

    render() {
        const { customer, loading, error } = this.state;

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
                <h2>Actualizar Cliente</h2>
                <Breadcrumb pageName="Actualizar Cliente" />
                <CustomerFormValidate 
                    mode={2} // 2 = Modo actualización
                    handleUpdate={this.handleUpdateCustomer}
                    customer={customer}
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

export default withRouter(UpdateCustomerPage);
