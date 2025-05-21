import React, { useEffect, useState } from 'react';
import { Field } from 'formik';
// Importamos directamente los servicios que necesitamos
import * as orderService from '../services/orderService';
import * as motorcycleService from '../services/motorcycleService';
import * as restaurantService from '../services/restaurantService';
import * as productService from '../services/productService';
import * as customerService from '../services/customerService';
import * as menuService from '../services/menuService';
import * as driverService from '../services/driverService';


interface ReferenceSelectProps {
  name: string;
  model: string; // ejemplo: 'restaurant', 'product', 'driver', etc.
  labelKey?: string; // qué campo mostrar como label (por defecto: 'name')
  valueKey?: string; // qué campo usar como value (por defecto: 'id')
  className?: string;
  disabled?: boolean;
}

const ReferenceSelect: React.FC<ReferenceSelectProps> = ({
  name,
  model,
  labelKey = 'name',
  valueKey = 'id',
  className = '',
  disabled = false,
}) => {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        let data: any[] = [];
        
        // En lugar de importación dinámica, usamos un switch para determinar qué servicio usar
        switch(model) {
          case 'order':
            data = await orderService.getOrders();
            break;
          case 'motorcycle':
            data = await motorcycleService.getMotorcycles();
            break;
          case 'driver':
            data = await driverService.getDrivers();
            break;
          case 'restaurant':
            data = await restaurantService.getRestaurants();
            break;
          case 'product':
            data = await productService.getProducts();
            break;
          case 'customer':
            data = await customerService.getCustomers();
            break;
          case 'menu':
            data = await menuService.getMenus();
            break;
          case 'motorcycle':
            data = await motorcycleService.getMotorcycles();
            break;
          // Aquí puedes agregar más casos para otros modelos
          default:
            console.error(`No se encontró un servicio para el modelo ${model}`);
            return;
        }

        console.log('Datos obtenidos:', data);
        setOptions(data || []);
      } catch (error) {
        console.error(`Error al cargar opciones para ${model}:`, error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOptions();
  }, [model]);

  return (
    <Field as="select" name={name} className={className} disabled={disabled || loading}>
      <option value="">Seleccione...</option>
      {options.map((item) => (
        <option key={item[valueKey]} value={item[valueKey]}>
          {/* Mostramos el id por defecto o el campo especificado */}
          {item[labelKey] || item[valueKey] || "ID: " + item.id}
        </option>
      ))}
      {loading && <option disabled>Cargando...</option>}
    </Field>
  );
};

export default ReferenceSelect;