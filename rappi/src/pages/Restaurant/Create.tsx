import React, { Component } from 'react';
import { Restaurant } from '../../models/restaurant';
import { createRestaurant } from '../../services/restaurantService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import RestaurantFormValidate from '../../components/Restaurants/RestaurantFormValidate';

interface CreateRestaurantPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface CreateRestaurantPageState {}

class CreateRestaurantPage extends Component<CreateRestaurantPageProps, CreateRestaurantPageState> {
    constructor(props: CreateRestaurantPageProps) {
        super(props);
    }

    handleCreateRestaurant = async (restaurant: Restaurant) => {
        try {
            // Omitimos el ID que viene del formulario ya que se genera en el backend
            const { id, ...restaurantData } = restaurant;
            const createdRestaurant = await createRestaurant(restaurantData);
            
            if (createdRestaurant) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el restaurante',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Restaurante creado con éxito:', createdRestaurant);
                this.props.navigate('/restaurant/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el restaurante',
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
                text: 'Existe un problema al momento de crear el restaurante',
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
                <h2>Crear Restaurante</h2>
                <Breadcrumb pageName="Crear Restaurante" />
                <RestaurantFormValidate 
                    mode={1} // 1 = Modo creación
                    handleCreate={this.handleCreateRestaurant}
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

export default withRouter(CreateRestaurantPage);
