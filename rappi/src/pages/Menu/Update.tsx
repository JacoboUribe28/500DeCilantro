import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getMenuById, updateMenu } from "../../services/menuService";
import Swal from "sweetalert2";

import { Menu } from '../../models/menu';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateMenuPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [menu, setMenu] = useState<Menu | null>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            if (!id) return;
            const menuData = await getMenuById(parseInt(id));
            setMenu(menuData);
        };

        fetchMenu();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setMenu(prev => {
            if (!prev) return prev;
            let newValue: any = value;
            if (type === "number") {
                newValue = value === "" ? "" : Number(value);
            } else if (type === "checkbox") {
                newValue = checked;
            }
            return { ...prev, [name]: newValue };
        });
    };

    const handleUpdateMenu = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!menu || !menu.id) {
            Swal.fire({
                title: "Error",
                text: "Menú no cargado correctamente.",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
            return;
        }

        try {
            const updated = await updateMenu(parseInt(menu.id), menu);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el menú",
                    icon: "success",
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                navigate("/menu/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el menú",
                    icon: "error",
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el menú",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
        }
    };

    if (!menu) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Menú" />
            <div className="flex flex-col gap-9 bg-blue-100">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
                    <h3 className="font-medium text-black dark:text-white mb-6 text-lg">
                        Actualizar Menú
                    </h3>
                    <form onSubmit={handleUpdateMenu} className="flex flex-col gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="price" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Precio:
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={menu.price !== undefined ? menu.price : ''}
                                onChange={handleChange}
                                required
                                step="0.01"
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="availbality" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Disponibilidad:
                            </label>
                            <input
                                type="checkbox"
                                id="availbality"
                                name="availbality"
                                checked={menu.availbality || false}
                                onChange={handleChange}
                                className="rounded focus:ring-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="restaurant_id" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                ID de Restaurante:
                            </label>
                            <input
                                type="number"
                                id="restaurant_id"
                                name="restaurant_id"
                                value={menu.restaurant_id !== undefined ? menu.restaurant_id : ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="product_id" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                ID de Producto:
                            </label>
                            <input
                                type="number"
                                id="product_id"
                                name="product_id"
                                value={menu.product_id !== undefined ? menu.product_id : ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90"
                        >
                            Actualizar Menú
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/menu/list")}
                            className="mt-2 inline-block rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                        >
                            Volver a la lista
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateMenuPage;
