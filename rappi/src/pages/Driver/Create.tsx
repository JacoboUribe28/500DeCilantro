import React, { Component, ChangeEvent, FormEvent } from 'react';
import { Driver } from '../../models/driver';
import { createDriver } from '../../services/driverService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';

interface DriverFormProps {
    handleCreate: (driver: Omit<Driver, 'id'>) => void;
}

interface DriverFormState {
    name: string;
    license_number: string;
    email: string;
    phone: string;
    status: string;
}

class DriverForm extends Component<DriverFormProps, DriverFormState> {
    constructor(props: DriverFormProps) {
        super(props);
        this.state = {
            name: '',
            license_number: '',
            email: '',
            phone: '',
            status: '',
        };
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ [e.target.name]: e.target.value } as Pick<DriverFormState, keyof DriverFormState>);
    };

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { name, license_number, email, phone, status } = this.state;
        this.props.handleCreate({
            name,
            license_number,
            email,
            phone,
            status,
        });
    };

    render() {
        const { name, license_number, email, phone, status } = this.state;
        return (
            <form onSubmit={this.onSubmit} className="space-y-4 max-w-md">
                <div>
                    <label className="block mb-1 font-semibold">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Número de Licencia</label>
                    <input
                        type="text"
                        name="license_number"
                        value={license_number}
                        onChange={this.handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Correo Electrónico</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Teléfono</label>
                    <input
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={this.handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Estado</label>
                    <input
                        type="text"
                        name="status"
                        value={status}
                        onChange={this.handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Crear Conductor
                </button>
            </form>
        );
    }
}

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

    handleCreateDriver = async (driver: Omit<Driver, 'id'>) => {
        try {
            const createdDriver = await createDriver(driver);
            if (createdDriver) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el conductor',
                    icon: 'success',
                    timer: 3000,
                });
                console.log('Conductor creado con éxito:', createdDriver);
                this.props.navigate('/driver/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el conductor',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear el conductor',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    render() {
        return (
            <div>
                <h2>Crear Conductor</h2>
                <Breadcrumb pageName="Crear Conductor" />
                <DriverForm handleCreate={this.handleCreateDriver} />
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
