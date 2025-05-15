import React, { useState, useEffect } from "react";
import { Menu } from "../../models/menu";

interface Props {
    menu: Menu;
    handleUpdate: (menu: Menu) => void;
    mode: number; // 1 = crear, 2 = actualizar
}

const MenuFormValidator: React.FC<Props> = ({ menu, handleUpdate, mode }) => {
    const [form, setForm] = useState<Menu>(menu);

    useEffect(() => {
        setForm(menu);
    }, [menu]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : ["price", "restaurant_id", "product_id"].includes(name)
                    ? Number(value)
                    : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleUpdate(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="price">Precio:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={form.price ?? ""}
                    onChange={handleChange}
                    required
                    min={0}
                    step="0.01"
                />
            </div>

            <div>
                <label htmlFor="availability">Disponibilidad:</label>
                <input
                    type="checkbox"
                    id="availability"
                    name="availability"
                    checked={!!form.availbality}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="restaurant_id">ID del Restaurante:</label>
                <input
                    type="number"
                    id="restaurant_id"
                    name="restaurant_id"
                    value={form.restaurant_id ?? ""}
                    onChange={handleChange}
                    required
                    min={1}
                />
            </div>

            <div>
                <label htmlFor="product_id">ID del Producto:</label>
                <input
                    type="number"
                    id="product_id"
                    name="product_id"
                    value={form.product_id ?? ""}
                    onChange={handleChange}
                    required
                    min={1}
                />
            </div>

            <button type="submit">
                {mode === 2 ? "Actualizar Menú" : "Crear Menú"}
            </button>
        </form>
    );
};

export default MenuFormValidator;
