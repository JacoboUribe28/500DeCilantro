import React, { Component } from 'react';
import { Product } from '../../models/product';
import { getProductById, updateProduct } from '../../services/productService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import ProductFormValidate from '../../components/Products/ProductFormValidate';

interface UpdateProductPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface UpdateProductPageState {
    product: Product | null;
    loading: boolean;
    error: string | null;
}

class UpdateProductPage extends Component<UpdateProductPageProps, UpdateProductPageState> {
    constructor(props: UpdateProductPageProps) {
        super(props);
        this.state = {
            product: null,
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
                    error: 'No se proporcionó un ID de producto' 
                });
                return;
            }

            const product = await getProductById(id);
            if (product) {
                this.setState({ product, loading: false });
            } else {
                this.setState({ 
                    loading: false, 
                    error: 'No se encontró el producto con el ID proporcionado' 
                });
            }
        } catch (error) {
            this.setState({ 
                loading: false, 
                error: 'Error al cargar los datos del producto' 
            });
        }
    }

    handleUpdateProduct = async (product: Product) => {
        try {
            const updatedProduct = await updateProduct(product.id || '', product);
            
            if (updatedProduct) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha actualizado correctamente el producto',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Producto actualizado con éxito:', updatedProduct);
                this.props.navigate('/product/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de actualizar el producto',
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
                text: 'Existe un problema al momento de actualizar el producto',
                icon: 'error',
                timer: 3000,
                customClass:{
                    confirmButton: 'text-black'
                }
            });
        }
    };

    render() {
        const { product, loading, error } = this.state;

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
                <h2>Actualizar Producto</h2>
                <Breadcrumb pageName="Actualizar Producto" />
                <ProductFormValidate 
                    mode={2} // 2 = Modo actualización
                    handleUpdate={this.handleUpdateProduct}
                    product={product}
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

export default withRouter(UpdateProductPage);
