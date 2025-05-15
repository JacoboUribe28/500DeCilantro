import React, { useState, useEffect } from 'react';
const Demo: React.FC = () => {
  //Aquí es la lógica
  let [name, setName] = useState('Gezux');

  let colores = ['verde', 'rojo', 'azul'];
  let flag = true;

  //Función para manejar los cambios en la caja de texto
  const manejarCambio = (event: any) => {
    setName(event.target.value); //Actualizar el estado con el val
  };

  useEffect(() => {
    console.log('jesus es re mk jajajaj, mas mk que un tmbre rosado');
    console.log('NDFOISNDFOIWN');
  });

  return (
    <div>
      <h1>Hello Kitty</h1>
      <br />
      <p>
        ¿¿Que cómo así, que cómo así, que cómo fue? Ajá ¿Que cómo así, que cómo
        así, que cómo fue? Ajá ¿Que cómo así, que cómo así, que cómo fue? Ajá ia
        Y pa' la calle Urban production Ras-tas-tas, tas-tas Dice, ras-tas-tas,
        tas-tas Dice, ras-tas-tas, tas-tas Dice, ras, tas, tas, tas (esta e' la
        gente de lo' timbale')
      </p>

      <br />
      <h1>{name} es gay?</h1>

      <input type="checkbox" name="si" id="" />
      <label htmlFor="si">re mk</label>
      <br />
      <input type="text" value={name} onChange={manejarCambio} />

      <br />
      <ul>
        {colores.map((color) => (
          <li>{color}</li>
        ))}
      </ul>
      <br />
      {flag ? (
        <h2>jesus se mete banderas via anal (lo disfruta mucho)</h2>
      ) : (
        <h2>4k4k4</h2>
      )}
    </div>
  );
};
export default Demo;
