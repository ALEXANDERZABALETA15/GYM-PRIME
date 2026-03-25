// Barra lateral de navegación del área administrativa
// Recibe "paginaActual" para saber qué item resaltar
// Recibe "navegarA" para cambiar de página
// Recibe "onCerrarSesion" para volver al Landing

function Sidebar({ paginaActual, navegarA, onCerrarSesion}){
    const items = [
        {id: "dashboard", label:"Dashboard", icono:"📊"},
        {id:"clientes", label:"Clientes", icono: "👥"},
        {id:"pagos", label:"Pagos", icono:"💰"}
    ]

    return (
    // h-screen     → ocupa toda la altura de la pantalla
    // w-64         → ancho fijo de 256px
    // flex flex-col → columna vertical
    // sticky top-0 → se queda fijo al hacer scroll
    <aside className="h-screen w-64 bg-gray-900 flex flex-col sticky top-0">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-700">
        {/* border-b border-gray-700 → línea divisoria abajo */}
        <h1 className="text-white font-bold text-xl">🏋️ GYM PRIME</h1>
        <p className="text-gray-400 text-xs mt-1">Panel administrativo</p>
      </div>

      {/* Items del menú */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {/*
          flex-1    → ocupa todo el espacio disponible
          space-y-1 → 4px entre cada item
        */}

        {items.map((item) => (
          // .map() recorre el array y genera un elemento por cada item
          <button
            key={item.id}
            // key → identificador único, React lo necesita al usar .map()
            onClick={() => navegarA(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200
              ${paginaActual === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            // {/*Template literal con condicional:
            //   Si es la página actual → fondo azul + texto blanco
            //   Si no→ texto gris + hover gris oscuro*/}
          >
            <span>{item.icono}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Botón cerrar sesión — al fondo del sidebar */}
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
  )
}

export default Sidebar