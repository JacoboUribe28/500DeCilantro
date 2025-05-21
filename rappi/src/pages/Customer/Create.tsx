import React, { Component, ChangeEvent, FormEvent } from 'react';
import { Customer } from '../../models/customer';
import { createCustomer } from '../../services/customerService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';

interface CustomerFormProps {
    handleCreate: (customer: Omit<Customer, 'id'>) => void;
}

interface CustomerFormState {
    name: string;
    email: string;
    phone: string;
}

class CustomerForm extends Component<CustomerFormProps, CustomerFormState> {
    constructor(props: CustomerFormProps) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
        };
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ [e.target.name]: e.target.value } as Pick<CustomerFormState, keyof CustomerFormState>);
    };

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { name, email, phone } = this.state;
        this.props.handleCreate({
            name,
            email,
            phone,
        });
    };

    render() {
        const { name, email, phone } = this.state;
        return (
            <form onSubmit={this.onSubmit} className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Crear Nuevo Cliente</h3>
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Ingrese el nombre"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Correo electrónico</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Ingrese el correo electrónico"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Teléfono</label>
                    <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={this.handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Ingrese el teléfono"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
                >
                    Crear Cliente
                </button>
            </form>
        );
    }
}

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

    handleCreateCustomer = async (customer: Omit<Customer, 'id'>) => {
        try {
            const createdCustomer = await createCustomer(customer);
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
                <CustomerForm handleCreate={this.handleCreateCustomer} />
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
