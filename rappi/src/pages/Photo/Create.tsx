import React, { Component } from 'react';
import { Photo } from '../../models/photo';
import { createPhoto } from '../../services/photoService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { NavigateFunction, Params, Location } from 'react-router-dom';
import PhotoFormValidate from '../../components/Photos/PhotoFormValidate';

interface CreatePhotoPageProps {
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    location: Location;
}

interface CreatePhotoPageState {}

class CreatePhotoPage extends Component<CreatePhotoPageProps, CreatePhotoPageState> {
    constructor(props: CreatePhotoPageProps) {
        super(props);
    }

    handleCreatePhoto = async (photo: Photo) => {
        try {
            // Omitimos el ID que viene del formulario ya que se genera en el backend
            const { id, ...photoData } = photo;
            const createdPhoto = await createPhoto(photoData);
            
            if (createdPhoto) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente la foto',
                    icon: 'success',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Foto creada con éxito:', createdPhoto);
                this.props.navigate('/photo/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear la foto',
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
                text: 'Existe un problema al momento de crear la foto',
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
                <h2>Crear Foto</h2>
                <Breadcrumb pageName="Crear Foto" />
                <PhotoFormValidate 
                    mode={1} // 1 = Modo creación
                    handleCreate={this.handleCreatePhoto}
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

export default withRouter(CreatePhotoPage);
