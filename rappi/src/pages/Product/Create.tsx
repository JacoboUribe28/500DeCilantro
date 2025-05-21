import React, { Component } from 'react';
import { Product } from '../../models/product';
import { createProduct } from '../../services/productService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import ProductFormValidate from '../../components/Products/ProductFormValidate';

interface CreateProductPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface CreateProductPageState {}

class CreateProductPage extends Component<CreateProductPageProps, CreateProductPageState> {
    constructor(props: CreateProductPageProps) {
        super(props);
    }

    handleCreateProduct = async (product: Product) => {
        try {
            // Omitimos el ID que viene del formulario ya que se genera en el backend
            const { id, ...productData } = product;
            const createdProduct = await createProduct(productData);
            
            if (createdProduct) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el producto',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Producto creado con éxito:', createdProduct);
                this.props.navigate('/product/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el producto',
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
                text: 'Existe un problema al momento de crear el producto',
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
                <h2>Crear Producto</h2>
                <Breadcrumb pageName="Crear Producto" />
                <ProductFormValidate 
                    mode={1} // 1 = Modo creación
                    handleCreate={this.handleCreateProduct}
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

export default withRouter(CreateProductPage);
