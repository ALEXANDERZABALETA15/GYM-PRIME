// src/components/Sidebar.jsx
// Sidebar responsive:
// - En desktop: siempre visible
// - En móvil: oculto, aparece al hacer click en el botón ☰

function Sidebar({ paginaActual, navegarA, onCerrarSesion, abierto, onCerrar }) {
  // abierto  → controla si el sidebar está visible en móvil
  // onCerrar → función para cerrarlo al hacer click fuera o en un item

  const items = [
    { id: "dashboard", label: "Dashboard", icono: "📊" },
    { id: "clientes",  label: "Clientes",  icono: "👥" },
    { id: "pagos",     label: "Pagos",     icono: "💰" },
    { id: "inventario", label: "Inventario", icono: "📦" },
  ]

  function handleNavegar(id) {
    navegarA(id)
    onCerrar() // cierra el sidebar en móvil al navegar
  }

  return (
    <>
      {/* ── OVERLAY — fondo oscuro en móvil ───────────
          Solo aparece en móvil cuando el sidebar está abierto
          Al hacer click cierra el sidebar                      */}
      {abierto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          // lg:hidden → en desktop (>=1024px) este overlay nunca aparece
          onClick={onCerrar}
        />
      )}

      {/* ── SIDEBAR ───────────────────────────────────── */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900 z-30
        flex flex-col
        transition-transform duration-300
        ${abierto ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0
      `}>
        {/*
          fixed top-0 left-0  → pegado arriba a la izquierda en móvil
          h-full               → altura completa
          z-30                 → por encima del overlay (z-20)
          transition-transform → anima el movimiento
          duration-300         → 300ms de animación

          translate-x-0        → visible (posición normal)
          -translate-x-full    → oculto (fuera de pantalla a la izquierda)

          lg:static            → en desktop vuelve al flujo normal
          lg:translate-x-0     → en desktop siempre visible
        */}

        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-xl">🏋️ GYM PRIME</h1>
            <p className="text-gray-400 text-xs mt-1">Panel administrativo</p>
          </div>
          {/* Botón cerrar — solo visible en móvil */}
          <button
            onClick={onCerrar}
            className="text-gray-400 hover:text-white lg:hidden text-xl"
            // lg:hidden → se oculta en desktop
          >
            ✕
          </button>
        </div>

        {/* Items del menú */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavegar(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200
                ${paginaActual === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <span>{item.icono}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Cerrar sesión */}
        <div className="px-4 py-6 border-t border-gray-700">
          <button
            onClick={onCerrarSesion}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-600 hover:text-white transition-colors duration-200"
          >
            <span>🚪</span>
            <span>Cerrar sesión</span>
          </button>
        </div>

      </aside>
    </>
  )
}

export default Sidebar