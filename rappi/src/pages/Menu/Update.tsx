import React, { Component } from 'react';
import { Menu } from '../../models/menu';
import { getMenuById, updateMenu } from '../../services/menuService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import MenuFormValidate from '../../components/Menus/MenuFormValidate';

interface UpdateMenuPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface UpdateMenuPageState {
    menu: Menu | null;
    loading: boolean;
    error: string | null;
}

class UpdateMenuPage extends Component<UpdateMenuPageProps, UpdateMenuPageState> {
    constructor(props: UpdateMenuPageProps) {
        super(props);
        this.state = {
            menu: null,
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
                    error: 'No se proporcionó un ID de menú' 
                });
                return;
            }

            const menu = await getMenuById(id);
            if (menu) {
                this.setState({ menu, loading: false });
            } else {
                this.setState({ 
                    loading: false, 
                    error: 'No se encontró el menú con el ID proporcionado' 
                });
            }
        } catch (error) {
            this.setState({ 
                loading: false, 
                error: 'Error al cargar los datos del menú' 
            });
        }
    }

    handleUpdateMenu = async (menu: Menu) => {
        try {
            const updatedMenu = await updateMenu(menu.id || '', menu);
            
            if (updatedMenu) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha actualizado correctamente el menú',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Menú actualizado con éxito:', updatedMenu);
                this.props.navigate('/menu/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de actualizar el menú',
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
                text: 'Existe un problema al momento de actualizar el menú',
                icon: 'error',
                timer: 3000,
                customClass:{
                    confirmButton: 'text-black'
                }
            });
        }
    };

    render() {
        const { menu, loading, error } = this.state;

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
                <h2>Actualizar Menú</h2>
                <Breadcrumb pageName="Actualizar Menú" />
                <MenuFormValidate 
                    mode={2} // 2 = Modo actualización
                    handleUpdate={this.handleUpdateMenu}
                    menu={menu}
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

export default withRouter(UpdateMenuPage);
