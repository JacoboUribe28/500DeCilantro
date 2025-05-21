import React, { Component } from 'react';
import { Order } from '../../models/order';
import { getOrderById, updateOrder } from '../../services/orderService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import OrderFormValidate from '../../components/Orders/OrderFormValidate';

interface UpdateOrderPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface UpdateOrderPageState {
    order: Order | null;
    loading: boolean;
    error: string | null;
}

class UpdateOrderPage extends Component<UpdateOrderPageProps, UpdateOrderPageState> {
    constructor(props: UpdateOrderPageProps) {
        super(props);
        this.state = {
            order: null,
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
                    error: 'No se proporcionó un ID de orden' 
                });
                return;
            }

            const order = await getOrderById(id);
            if (order) {
                this.setState({ order, loading: false });
            } else {
                this.setState({ 
                    loading: false, 
                    error: 'No se encontró la orden con el ID proporcionado' 
                });
            }
        } catch (error) {
            this.setState({ 
                loading: false, 
                error: 'Error al cargar los datos de la orden' 
            });
        }
    }

    handleUpdateOrder = async (order: Order) => {
        try {
            const updatedOrder = await updateOrder(order.id || '', order);
            
            if (updatedOrder) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha actualizado correctamente la orden',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Orden actualizada con éxito:', updatedOrder);
                this.props.navigate('/order/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de actualizar la orden',
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
                text: 'Existe un problema al momento de actualizar la orden',
                icon: 'error',
                timer: 3000,
                customClass:{
                    confirmButton: 'text-black'
                }
            });
        }
    };

    render() {
        const { order, loading, error } = this.state;

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
                <h2>Actualizar Orden</h2>
                <Breadcrumb pageName="Actualizar Orden" />
                <OrderFormValidate 
                    mode={2} // 2 = Modo actualización
                    handleUpdate={this.handleUpdateOrder}
                    order={order}
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

export default withRouter(UpdateOrderPage);
