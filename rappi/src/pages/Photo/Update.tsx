import React, { Component } from 'react';
import { Photo } from '../../models/photo';
import { getPhotoById, updatePhoto } from '../../services/photoService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import PhotoFormValidate from '../../components/Photos/PhotoFormValidate';

interface UpdatePhotoPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface UpdatePhotoPageState {
    photo: Photo | null;
    loading: boolean;
    error: string | null;
}

class UpdatePhotoPage extends Component<UpdatePhotoPageProps, UpdatePhotoPageState> {
    constructor(props: UpdatePhotoPageProps) {
        super(props);
        this.state = {
            photo: null,
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
                    error: 'No se proporcionó un ID de foto' 
                });
                return;
            }

            const photo = await getPhotoById(id);
            if (photo) {
                this.setState({ photo, loading: false });
            } else {
                this.setState({ 
                    loading: false, 
                    error: 'No se encontró la foto con el ID proporcionado' 
                });
            }
        } catch (error) {
            this.setState({ 
                loading: false, 
                error: 'Error al cargar los datos de la foto' 
            });
        }
    }

    handleUpdatePhoto = async (photo: Photo) => {
        try {
            const updatedPhoto = await updatePhoto(photo.id || '', photo);
            
            if (updatedPhoto) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha actualizado correctamente la foto',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Foto actualizada con éxito:', updatedPhoto);
                this.props.navigate('/photo/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de actualizar la foto',
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
                text: 'Existe un problema al momento de actualizar la foto',
                icon: 'error',
                timer: 3000,
                customClass:{
                    confirmButton: 'text-black'
                }
            });
        }
    };

    render() {
        const { photo, loading, error } = this.state;

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
                <h2>Actualizar Foto</h2>
                <Breadcrumb pageName="Actualizar Foto" />
                <PhotoFormValidate 
                    mode={2} // 2 = Modo actualización
                    handleUpdate={this.handleUpdatePhoto}
                    photo={photo}
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

export default withRouter(UpdatePhotoPage);
