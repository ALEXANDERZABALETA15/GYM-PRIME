// src/components/AdminLayout.jsx
// Layout compartido para todas las páginas del panel admin
// Contiene: Sidebar + Navbar móvil + Contenido
// Así no repetimos código en cada página

import { useState } from "react"
import Sidebar from "./Sidebar"

function AdminLayout({ paginaActual, navegarA, onCerrarSesion, children }) {
  // children → es el contenido de cada página (Dashboard, Clientes, Pagos)
  // Funciona como un "slot" — lo que pongas dentro del componente
  // aparece donde está {children}

  // Estado del sidebar en móvil
  const [sidebarAbierto, setSidebarAbierto] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar — recibe el estado de abierto/cerrado */}
      <Sidebar
        paginaActual={paginaActual}
        navegarA={navegarA}
        onCerrarSesion={onCerrarSesion}
        abierto={sidebarAbierto}
        onCerrar={() => setSidebarAbierto(false)}
      />

      {/* Columna derecha — navbar móvil + contenido */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── NAVBAR MÓVIL ────────────────────────────
            Solo visible en móvil (lg:hidden)
            Contiene el botón ☰ para abrir el sidebar  */}
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between lg:hidden">
          {/*
            lg:hidden → se oculta en desktop (no lo necesitan)
          */}

          {/* Botón hamburguesa ☰ */}
          <button
            onClick={() => setSidebarAbierto(true)}
            className="text-gray-600 hover:text-gray-900 p-1"
          >
            {/* Ícono hamburguesa hecho con SVG */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
              {/*
                Tres líneas horizontales = ícono hamburguesa
                M4 6h16  → línea de x=4 a x=16 en y=6
                M4 12h16 → línea del medio
                M4 18h16 → línea de abajo
              */}
            </svg>
          </button>

          {/* Logo centrado en móvil */}
          <h1 className="text-black font-bold text-lg">🏋️ GYM PRIME</h1>

          {/* Espacio vacío para centrar el logo */}
          <div className="w-8" />

        </header>

        {/* ── CONTENIDO DE LA PÁGINA ──────────────── */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/*
            p-4        → padding de 16px en móvil
            lg:p-8     → padding de 32px en desktop
            children   → aquí aparece el contenido de cada página
          */}
          {children}
        </main>

      </div>
    </div>
  )
}

export default AdminLayout