import React, { Component } from "react";
import { MotorcycleInfraction } from "../../models/MotorcycleInfraction";
import { MotorcycleInfractionManager } from "../../core/MotorcycleInfractionManager";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import MotorcycleInfractionForm from "../../components/Motorcycles/MotorcycleInfractionForm";
import { NavigateFunction, Params, Location } from "react-router-dom";

interface Props {
  navigate: NavigateFunction;
  params: Readonly<Params<string>>;
  location: Location;
}

interface State {}

class CreateMotorcycleInfractionPage extends Component<Props, State> {
  handleCreate = async (data: MotorcycleInfraction) => {
    try {
      const result = await MotorcycleInfractionManager.registrar(data);

      if (result) {
        Swal.fire({
          title: "Completado",
          text: "Infracción registrada correctamente",
          icon: "success",
          timer: 3000,
          customClass: {
            confirmButton: "text-black",
          },
        });
        this.props.navigate("/motorcycle-infractions/list");
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo registrar la infracción",
          icon: "error",
          timer: 3000,
          customClass: {
            confirmButton: "text-black",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error inesperado al registrar la infracción",
        icon: "error",
        timer: 3000,
        customClass: {
          confirmButton: "text-black",
        },
      });
    }
  };

  render() {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Registrar Infracción</h2>
        <Breadcrumb pageName="Registrar Infracción" />
        <MotorcycleInfractionForm mode={1} handleCreate={this.handleCreate} />
      </div>
    );
  }
}

import { useNavigate, useParams, useLocation } from "react-router-dom";

function withRouter(Component: any) {
  return function ComponentWithRouterProps(props: any) {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    return <Component {...props} navigate={navigate} params={params} location={location} />;
  };
}

export default withRouter(CreateMotorcycleInfractionPage);
