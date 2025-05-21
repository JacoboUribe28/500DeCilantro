import React, { Component } from 'react';
import { Address } from '../../models/address';
import { createAddress } from '../../services/addressService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import AddressFormValidate from '../../components/Addresses/AddressFormValidate';

interface CreateAddressPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface CreateAddressPageState {}

class CreateAddressPage extends Component<CreateAddressPageProps, CreateAddressPageState> {
    constructor(props: CreateAddressPageProps) {
        super(props);
    }

    handleCreateAddress = async (address: Address) => {
        try {
            // Omitimos el ID que viene del formulario ya que se genera en el backend
            const { id, ...addressData } = address;
            const createdAddress = await createAddress(addressData);
            
            if (createdAddress) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente la dirección',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Dirección creada con éxito:', createdAddress);
                this.props.navigate('/address/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear la dirección',
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
                text: 'Existe un problema al momento de crear la dirección',
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
                <h2>Crear Dirección</h2>
                <Breadcrumb pageName="Crear Dirección" />
                <AddressFormValidate 
                    mode={1} // 1 = Modo creación
                    handleCreate={this.handleCreateAddress}
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

export default withRouter(CreateAddressPage);