import { useState } from "react"
import AdminLayout from "../components/AdminLayout" 
import { clientesIniciales } from "../data/clientes"

function Clientes({ paginaActual, navegarA, onCerrarSesion }) {

  // ── ESTADO PRINCIPAL ─────────────────────────────────

  // Lista de clientes — empieza con los datos base
  const [clientes, setClientes] = useState(clientesIniciales)

  // Texto que el usuario escribe en el buscador
  const [busqueda, setBusqueda] = useState("")

  // Filtro activo: "todos", "activos", "vencidos"
  const [filtro, setFiltro] = useState("todos")

  // Controla si el modal está abierto o cerrado
  const [modalAbierto, setModalAbierto] = useState(false)

  // Cliente que se está editando (null = estamos creando uno nuevo)
  const [clienteEditando, setClienteEditando] = useState(null)

  // Datos del formulario dentro del modal
  const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    fechaInicio: "",
    fechaVencimiento: "",
    plan: "Básico"
  })

  // ── FECHA DE HOY ─────────────────────────────────────
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  // ── LÓGICA DE BÚSQUEDA Y FILTROS ─────────────────────

  // Primero filtramos por estado (activo/vencido)
  // Luego filtramos por búsqueda de texto
  const clientesFiltrados = clientes
    .filter(c => {
      // Filtro por estado
      if (filtro === "activos")  return new Date(c.fechaVencimiento) >= hoy
      if (filtro === "vencidos") return new Date(c.fechaVencimiento) < hoy
      return true // "todos" — no filtra nada
    })
    .filter(c => {
      // Filtro por búsqueda — busca en nombre y teléfono
      const texto = busqueda.toLowerCase()
      // .toLowerCase() convierte a minúsculas para comparar sin importar mayúsculas
      return (
        c.nombre.toLowerCase().includes(texto) ||
        c.telefono.includes(texto)
        // .includes() devuelve true si el texto está contenido
      )
    })

  // ── CRUD — CREATE ─────────────────────────────────────

  function abrirModalNuevo() {
    setClienteEditando(null) // null indica que es nuevo, no edición
    setFormulario({
      nombre: "",
      telefono: "",
      fechaInicio: "",
      fechaVencimiento: "",
      plan: "Básico"
    })
    setModalAbierto(true)
  }

  // ── CRUD — UPDATE ─────────────────────────────────────

  function abrirModalEditar(cliente) {
    setClienteEditando(cliente) // guardamos el cliente que vamos a editar
    setFormulario({
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      fechaInicio: cliente.fechaInicio,
      fechaVencimiento: cliente.fechaVencimiento,
      plan: cliente.plan
    })
    setModalAbierto(true)
  }

  // ── CRUD — SAVE (Create + Update juntos) ──────────────

  function guardarCliente() {

    // Validación — todos los campos son obligatorios
    if (!formulario.nombre || !formulario.telefono ||
        !formulario.fechaInicio || !formulario.fechaVencimiento) {
      alert("Por favor completa todos los campos.")
      return
    }

    if (clienteEditando) {
      // ── EDITAR cliente existente ──
      // Recorremos todos los clientes con .map()
      // Si el id coincide → lo reemplazamos con los nuevos datos
      // Si no coincide → lo dejamos igual
      setClientes(clientes.map(c =>
        c.id === clienteEditando.id
          ? { ...c, ...formulario }
          //   👆 spread: copia todo lo del cliente original
          //      y luego sobreescribe con los datos del formulario
          : c
      ))
    } else {
      // ── CREAR cliente nuevo ──
      const nuevoCliente = {
        id: Date.now(),
        // Date.now() genera un número único basado en la hora actual
        // Es una forma simple de generar IDs únicos sin base de datos
        ...formulario,
        activo: true
      }
      setClientes([...clientes, nuevoCliente])
      // spread: copia todos los clientes existentes y agrega el nuevo al final
    }

    setModalAbierto(false) // cierra el modal
  }

  // ── CRUD — DELETE ─────────────────────────────────────

  function eliminarCliente(id) {
    // window.confirm muestra un diálogo de confirmación al usuario
    const confirmar = window.confirm("¿Seguro que quieres eliminar este cliente?")
    if (!confirmar) return

    // .filter() devuelve todos EXCEPTO el que tiene ese id
    setClientes(clientes.filter(c => c.id !== id))
  }

  // ── HELPER — actualizar campo del formulario ──────────

  function actualizarFormulario(campo, valor) {
    // Spread: copia todo el formulario y solo cambia el campo indicado
    setFormulario({ ...formulario, [campo]: valor })
    // [campo] es una clave dinámica — el nombre de la variable se usa como clave
    // Si campo = "nombre" → actualiza formulario.nombre
  }

  // ── HELPER — estado visual del cliente ───────────────

  function estadoCliente(fechaVencimiento) {
    const vence = new Date(fechaVencimiento)
    const diff  = (vence - hoy) / (1000 * 60 * 60 * 24)

    if (diff < 0)  return { texto: "Vencido",    estilo: "bg-red-100 text-red-600" }
    if (diff <= 7) return { texto: "Por vencer",  estilo: "bg-orange-100 text-orange-600" }
    return           { texto: "Activo",      estilo: "bg-green-100 text-green-600" }
  }

  // ── VISTA ─────────────────────────────────────────────

  return (
    // ✅ CAMBIO: antes era <div className="flex h-screen bg-gray-100 overflow-hidden">
    //           con <AdminLayout> y <main> por separado
    //           Ahora AdminLayout lo maneja todo internamente
    <AdminLayout
      paginaActual={paginaActual}
      navegarA={navegarA}
      onCerrarSesion={onCerrarSesion}
    >
      {/* ✅ CAMBIO: todo este contenido antes estaba dentro de <main>
          Ahora va directo como children de AdminLayout
          AdminLayout se encarga de ponerlo dentro del <main> */}

      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">👥 Clientes</h2>
          <p className="text-gray-500 text-sm mt-1">
            {clientes.length} clientes registrados
          </p>
        </div>
        <button
          onClick={abrirModalNuevo}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors duration-200"
        >
          + Nuevo cliente
        </button>
      </div>

      {/* Buscador y filtros */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4">

        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="🔍 Buscar por nombre o teléfono..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Botones de filtro */}
        <div className="flex gap-2">
          {["todos", "activos", "vencidos"].map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors duration-200
                ${filtro === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de clientes */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-gray-500">
                <th className="px-6 py-4 font-medium">Nombre</th>
                <th className="px-6 py-4 font-medium">Teléfono</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Vencimiento</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium">Acciones</th>
               </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {clientesFiltrados.length === 0 ? (
                // Si no hay resultados mostramos un mensaje
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    {/* colSpan → la celda ocupa todas las columnas */}
                    No se encontraron clientes.
                  </td>
                </tr>
              ) : (
                clientesFiltrados.map(c => {
                  const estado = estadoCliente(c.fechaVencimiento)
                  return (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {c.nombre}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {c.telefono}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {c.plan}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(c.fechaVencimiento).toLocaleDateString("es-CO")}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${estado.estilo}`}>
                          {estado.texto}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => abrirModalEditar(c)}
                            className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() => eliminarCliente(c.id)}
                            className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* ── MODAL — Crear / Editar cliente ────────────── */}
      {/* ✅ CAMBIO: el modal se queda aquí dentro de AdminLayout
          Funciona igual porque usa "fixed" que lo saca del flujo normal
          y lo pone encima de todo con z-50 */}
      {modalAbierto && (
        // El && hace que el modal solo se renderice cuando está abierto
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          {/*
            fixed inset-0    → cubre TODA la pantalla
            bg-black/50      → fondo negro semitransparente
            z-50             → por encima de todo
          */}
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            {/* Encabezado del modal */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">
                {clienteEditando ? "✏️ Editar cliente" : "➕ Nuevo cliente"}
              </h3>
              <button
                onClick={() => setModalAbierto(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Campos del formulario */}
            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={formulario.nombre}
                  onChange={(e) => actualizarFormulario("nombre", e.target.value)}
                  placeholder="Ej: Carlos Andrés Martínez"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  value={formulario.telefono}
                  onChange={(e) => actualizarFormulario("telefono", e.target.value)}
                  placeholder="Ej: 3001234567"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan
                </label>
                <select
                  value={formulario.plan}
                  onChange={(e) => actualizarFormulario("plan", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {/* select → menú desplegable */}
                  <option value="Básico">Básico — $50.000</option>
                  <option value="Pro">Pro — $80.000</option>
                  <option value="Premium">Premium — $120.000</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha inicio
                  </label>
                  <input
                    type="date"
                    value={formulario.fechaInicio}
                    onChange={(e) => actualizarFormulario("fechaInicio", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha vencimiento
                  </label>
                  <input
                    type="date"
                    value={formulario.fechaVencimiento}
                    onChange={(e) => actualizarFormulario("fechaVencimiento", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

            </div>

            {/* Botones del modal */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setModalAbierto(false)}
                className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2 rounded-xl text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={guardarCliente}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl text-sm transition-colors"
              >
                {clienteEditando ? "Guardar cambios" : "Crear cliente"}
              </button>
            </div>

          </div>
        </div>
      )}

    </AdminLayout>
    // ✅ CAMBIO: antes cerraba </div> — ahora cierra </AdminLayout>
  )
}

export default Clientes