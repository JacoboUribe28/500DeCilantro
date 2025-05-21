import React, { Component } from 'react';
import { Customer } from '../../models/customer';
import { createCustomer } from '../../services/customerService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import CustomerFormValidate from '../../components/Customers/CustomerFormValidate';

interface CreateCustomerPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface CreateCustomerPageState {}

class CreateCustomerPage extends Component<CreateCustomerPageProps, CreateCustomerPageState> {
    constructor(props: CreateCustomerPageProps) {
        super(props);
    }

    handleCreateCustomer = async (customer: Customer) => {
        try {
            // Omitimos el ID que viene del formulario ya que se genera en el backend
            const { id, ...customerData } = customer;
            const createdCustomer = await createCustomer(customerData);
            
            if (createdCustomer) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el cliente',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Cliente creado con éxito:', createdCustomer);
                this.props.navigate('/customer/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el cliente',
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
                text: 'Existe un problema al momento de crear el cliente',
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
                <h2>Crear Cliente</h2>
                <Breadcrumb pageName="Crear Cliente" />
                <CustomerFormValidate 
                    mode={1} // 1 = Modo creación
                    handleCreate={this.handleCreateCustomer}
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

export default withRouter(CreateCustomerPage);
