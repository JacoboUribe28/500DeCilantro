import React, { Component } from 'react';
import { Menu } from '../../models/menu';
import { createMenu } from '../../services/menuService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import MenuFormValidate from '../../components/Menus/MenuFormValidate';

interface CreateMenuPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface CreateMenuPageState {}

class CreateMenuPage extends Component<CreateMenuPageProps, CreateMenuPageState> {
    constructor(props: CreateMenuPageProps) {
        super(props);
    }

    handleCreateMenu = async (menu: Menu) => {
        try {
            // Omitimos el ID que viene del formulario ya que se genera en el backend
            const { id, ...menuData } = menu;
            const createdMenu = await createMenu(menuData);
            
            if (createdMenu) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el menú',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Menú creado con éxito:', createdMenu);
                this.props.navigate('/menu/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el menú',
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
                text: 'Existe un problema al momento de crear el menú',
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
                <h2>Crear Menú</h2>
                <Breadcrumb pageName="Crear Menú" />
                <MenuFormValidate 
                    mode={1} // 1 = Modo creación
                    handleCreate={this.handleCreateMenu}
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

export default withRouter(CreateMenuPage);
