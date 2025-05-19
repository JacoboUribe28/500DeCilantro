# 500DeCilantro
# 🌿 500DeCilantro

Proyecto basado en React + TypeScript con arquitectura modular por features. Este repositorio contiene la base de una plataforma organizada, escalable y preparada para integrarse con APIs externas usando OAuth.

---

## 🚀 Inicialización del Proyecto

Este proyecto fue creado a partir de la siguiente plantilla recomendada:  
🔗 [https://github.com/JacoboUribe28/500DeCilantro](https://github.com/JacoboUribe28/500DeCilantro)

### ✅ Pasos iniciales

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/JacoboUribe28/500DeCilantro
   cd 500DeCilantro

/src
 ├── /apps               # Módulos organizados por dominio funcional
 │    ├── /orders
 │    ├── /products
 │    ├── /drivers
 │    ├── /motorcycles
 │    ├── /customers
 │    ├── /restaurants
 │    ├── /menus
 │    ├── /addresses
 │    ├── /shifts
 │    └── /issues
 ├── /components         # Componentes reutilizables
 ├── /hooks              # Hooks personalizados
 ├── /store              # Estado global (Zustand)
 ├── /services           # Lógica de conexión a API (Axios)
 ├── /routes             # Rutas y navegación
 ├── /utils              # Utilidades y helpers
 └── /pages              # Páginas públicas y privadas

