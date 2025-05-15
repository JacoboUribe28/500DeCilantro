import React from "react";

const TablaGenerica = ({ datos, columnas, acciones, onAccion }) => {
  return (
    <table>
      <thead>
        <tr>
          {columnas.map((col) => (
            <th key={col}>{col}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((item, index) => (
          <tr key={index}>
            {columnas.map((col) => (
              <td key={col}>{item[col]}</td>
            ))}
            <td>
              {acciones.map((accion) => (
                <button
                  key={accion.nombre}
                  onClick={() => onAccion(accion.nombre, item)}
                >
                  {accion.etiqueta}
                </button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaGenerica;