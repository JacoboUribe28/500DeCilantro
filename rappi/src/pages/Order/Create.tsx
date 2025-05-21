import React, { Component } from 'react';
import { Order } from '../../models/order';
import { createOrder } from '../../services/orderService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import OrderFormValidate from '../../components/Orders/OrderFormValidate';

interface CreateOrderPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface CreateOrderPageState {}

class CreateOrderPage extends Component<CreateOrderPageProps, CreateOrderPageState> {
    constructor(props: CreateOrderPageProps) {
        super(props);
    }

    handleCreateOrder = async (order: Order) => {
        try {
            // Omitimos el ID que viene del formulario ya que se genera en el backend
            const { id, ...orderData } = order;
            const createdOrder = await createOrder(orderData);
            
            if (createdOrder) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el pedido',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Pedido creado con éxito:', createdOrder);
                this.props.navigate('/order/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el pedido',
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
                text: 'Existe un problema al momento de crear el pedido',
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
                <h2>Crear Pedido</h2>
                <Breadcrumb pageName="Crear Pedido" />
                <OrderFormValidate 
                    mode={1} // 1 = Modo creación
                    handleCreate={this.handleCreateOrder}
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

export default withRouter(CreateOrderPage);
