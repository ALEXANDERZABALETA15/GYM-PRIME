# 🏋️ GYM PRIME

Sistema de gestión para gimnasio de barrio desarrollado con React y Tailwind CSS.
Proyecto construido desde cero con fines de aprendizaje y uso real.

---

## 🚀 Tecnologías utilizadas

- **React 18** — Librería para construir interfaces de usuario
- **Tailwind CSS v4** — Framework de estilos utilitarios
- **Vite** — Servidor de desarrollo ultrarrápido

---

## 📋 Funcionalidades actuales

- ✅ Landing page pública (Navbar, Banner, Nosotros, Servicios, Precios, Galería, Footer)
- ✅ Login con validación de credenciales
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Sidebar responsive con menú hamburguesa en móvil
- ✅ Módulo de clientes — CRUD completo (crear, editar, eliminar, buscar, filtrar)
- ✅ Módulo de pagos — registro, historial y resumen mensual
- ✅ Alertas de membresías por vencer y clientes sin pagar
- ✅ Botón flotante de WhatsApp con mensaje predeterminado
- ✅ Diseño responsive — móvil, tablet y desktop

---

## 🛠️ En desarrollo

- 🔄 Conexión a base de datos real (Firebase)
- 🔄 Importación de Excel con datos reales del gym
- 🔄 Exportar reportes en PDF o Excel
- 🔄 Navegación con React Router

---

## ▶️ Cómo correr el proyecto
```bash
# 1. Clona el repositorio
git clone https://github.com/ALEXANDERZABALETA15/GYM-PRIME.git

# 2. Entra a la carpeta
cd GYM-PRIME

# 3. Instala las dependencias
npm install

# 4. Corre el servidor de desarrollo
npm run dev
```

Abre http://localhost:5173 en tu navegador.

---

## 🔐 Credenciales de prueba
```
Email:      admin@gym.com
Contraseña: 1234
```

---

## 📁 Estructura del proyecto
```
src/
├── components/
│   ├── AdminLayout.jsx  → Layout compartido del panel admin
│   ├── Sidebar.jsx      → Navegación lateral responsive
│   └── WhatsAppButton.jsx → Botón flotante de WhatsApp
├── data/
│   └── clientes.js      → Base de datos en memoria (temporal)
├── pages/
│   ├── Landing.jsx      → Página pública de inicio
│   ├── Login.jsx        → Autenticación de usuario
│   ├── Dashboard.jsx    → Panel principal con estadísticas
│   ├── Clientes.jsx     → Gestión de socios (CRUD)
│   └── Pagos.jsx        → Registro y historial de pagos
├── App.jsx              → Navegación y control de páginas
└── main.jsx             → Punto de entrada de la app
```

---

## 👨‍💻 Autor

**Jhon Alexander Zabaleta**
[@ALEXANDERZABALETA15](https://github.com/ALEXANDERZABALETA15)