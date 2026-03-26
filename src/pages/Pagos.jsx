// Módulo de gestión de pagos
// Muestra historial, resumen del mes y permite registrar nuevos pagos



// src/pages/Pagos.jsx
// Módulo de gestión de pagos
// Muestra historial, resumen del mes y permite registrar nuevos pagos

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import { clientesIniciales, pagosIniciales, precios } from "../data/clientes"
import AdminLayout from "../components/AdminLayout"

function Pagos({ paginaActual, navegarA, onCerrarSesion }) {

  // ── ESTADO PRINCIPAL ─────────────────────────────────
  const [clientes]        = useState(clientesIniciales)
  const [pagos, setPagos] = useState(pagosIniciales)
  const [modalAbierto, setModalAbierto]   = useState(false)
  const [filtroMes, setFiltroMes]         = useState("todos")
  const [formulario, setFormulario]       = useState({
    clienteId: "",
    metodoPago: "Efectivo",
    fecha: new Date().toISOString().split("T")[0]
    // .toISOString() → "2025-03-25T00:00:00.000Z"
    // .split("T")[0] → "2025-03-25" (solo la fecha)
  })

  // ── FECHA DE HOY ─────────────────────────────────────
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  // ── HELPER — busca el nombre del cliente por su id ───
  function nombreCliente(clienteId) {
    const cliente = clientes.find(c => c.id === clienteId)
    // .find() → devuelve el PRIMER elemento que cumple la condición
    //           (a diferencia de .filter() que devuelve todos)
    return cliente ? cliente.nombre : "Cliente no encontrado"
    // operador ternario: si existe → nombre, si no → mensaje
  }

  // ── HELPER — busca el plan del cliente por su id ─────
  function planCliente(clienteId) {
    const cliente = clientes.find(c => c.id === clienteId)
    return cliente ? cliente.plan : ""
  }

  // ── HELPER — formato de moneda ───────────────────────
  function formatoPeso(valor) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
    }).format(valor)
  }

  // ── CÁLCULOS DEL MES ACTUAL ──────────────────────────
  const mesActual = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}`
  // hoy.getFullYear() → 2025
  // hoy.getMonth()    → 2 (los meses van de 0 a 11, marzo = 2)
  // + 1               → 3
  // padStart(2, "0")  → "03" (agrega cero a la izquierda si es menor a 10)
  // resultado         → "2025-03"

  const pagosMesActual = pagos.filter(p => p.mes === mesActual)

  const totalRecaudado = pagosMesActual.reduce((total, p) => total + p.monto, 0)
  // .reduce() acumula la suma de todos los montos

  // Clientes que YA pagaron este mes
  const clientesQuePagaron = pagosMesActual.map(p => p.clienteId)
  // .map() extrae solo los clienteId de los pagos del mes
  // resultado: [1, 2, 4, 5]

  // Clientes activos que AÚN NO han pagado este mes
  const clientesSinPagar = clientes.filter(c =>
    c.activo && !clientesQuePagaron.includes(c.id)
    // ! → negación (NOT)
    // .includes() → verifica si el id está en el array
  )

  // ── FILTRO DE PAGOS ──────────────────────────────────
  const pagosFiltrados = filtroMes === "todos"
    ? pagos
    : pagos.filter(p => p.mes === filtroMes)

  // ── MESES DISPONIBLES para el filtro ────────────────
  const mesesDisponibles = [...new Set(pagos.map(p => p.mes))]
  // new Set() → elimina duplicados automáticamente
  // [...] → convierte el Set de vuelta a array
  // resultado: ["2025-03"] (meses únicos que tienen pagos)

  // ── REGISTRAR NUEVO PAGO ─────────────────────────────
  function registrarPago() {
    if (!formulario.clienteId) {
      alert("Por favor selecciona un cliente.")
      return
    }

    const cliente = clientes.find(c => c.id === Number(formulario.clienteId))
    // Number() convierte el string del select a número
    // porque los ids en clientes son números: id: 1, id: 2...
    // pero el valor del select siempre llega como string: "1", "2"...

    const fechaPago   = new Date(formulario.fecha)
    const mesPago     = `${fechaPago.getFullYear()}-${String(fechaPago.getMonth() + 1).padStart(2, "0")}`

    const nuevoPago = {
      id:         Date.now(),
      clienteId:  Number(formulario.clienteId),
      monto:      precios[cliente.plan],
      // el monto se calcula automáticamente según el plan del cliente
      fecha:      formulario.fecha,
      mes:        mesPago,
      metodoPago: formulario.metodoPago
    }

    setPagos([...pagos, nuevoPago])
    setModalAbierto(false)
    setFormulario({
      clienteId: "",
      metodoPago: "Efectivo",
      fecha: new Date().toISOString().split("T")[0]
    })
  }

  // ── ELIMINAR PAGO ────────────────────────────────────
  function eliminarPago(id) {
    const confirmar = window.confirm("¿Eliminar este pago?")
    if (!confirmar) return
    setPagos(pagos.filter(p => p.id !== id))
  }

  // ── VISTA ─────────────────────────────────────────────
   return (
    // ✅ CAMBIO: antes era <div className="flex h-screen bg-gray-100 overflow-hidden">
    //           con <Sidebar> y <main> por separado
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
          <h2 className="text-2xl font-bold text-gray-800">💰 Pagos</h2>
          <p className="text-gray-500 text-sm mt-1">
            Historial y registro de cobros
          </p>
        </div>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors duration-200"
        >
          + Registrar pago
        </button>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 mb-4">
            <span className="text-2xl">💵</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {formatoPeso(totalRecaudado)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Recaudado este mes</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {pagosMesActual.length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Pagos registrados</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <p className="text-2xl font-bold text-red-500">
            {clientesSinPagar.length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Clientes sin pagar</p>
        </div>

      </div>

      {/* Clientes sin pagar — alerta */}
      {clientesSinPagar.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-red-700 mb-3">
            ❌ Clientes sin pagar este mes
          </h3>
          <div className="space-y-2">
            {clientesSinPagar.map(c => (
              <div key={c.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
                <div>
                  <p className="font-medium text-gray-800">{c.nombre}</p>
                  <p className="text-xs text-gray-500">Plan {c.plan} · 📞 {c.telefono}</p>
                </div>
                <span className="text-sm font-semibold text-red-500">
                  {formatoPeso(precios[c.plan])}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtro por mes */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-500 font-medium">Filtrar por mes:</span>
        <div className="flex gap-2">
          <button
            onClick={() => setFiltroMes("todos")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
              ${filtroMes === "todos"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            Todos
          </button>
          {mesesDisponibles.map(mes => (
            <button
              key={mes}
              onClick={() => setFiltroMes(mes)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                ${filtroMes === mes
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {mes}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de pagos */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-gray-500">
                <th className="px-6 py-4 font-medium">Cliente</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Monto</th>
                <th className="px-6 py-4 font-medium">Fecha</th>
                <th className="px-6 py-4 font-medium">Método</th>
                <th className="px-6 py-4 font-medium">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {pagosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No hay pagos registrados.
                  </td>
                </tr>
              ) : (
                pagosFiltrados.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {nombreCliente(p.clienteId)}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {planCliente(p.clienteId)}
                    </td>
                    <td className="px-6 py-4 font-semibold text-green-600">
                      {formatoPeso(p.monto)}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(p.fecha).toLocaleDateString("es-CO")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${p.metodoPago === "Efectivo"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                        }`}>
                        {p.metodoPago}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => eliminarPago(p.id)}
                        className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* ── MODAL — Registrar pago ───────────────────── */}
      {/* ✅ CAMBIO: el modal se queda aquí dentro de AdminLayout
          Funciona igual porque usa "fixed" que lo saca del flujo normal
          y lo pone encima de todo con z-50 */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">
                💰 Registrar pago
              </h3>
              <button
                onClick={() => setModalAbierto(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente
                </label>
                <select
                  value={formulario.clienteId}
                  onChange={(e) => setFormulario({ ...formulario, clienteId: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona un cliente...</option>
                  {clientes.filter(c => c.activo).map(c => (
                    <option key={c.id} value={c.id}>
                      {c.nombre} — Plan {c.plan} ({formatoPeso(precios[c.plan])})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Método de pago
                </label>
                <select
                  value={formulario.metodoPago}
                  onChange={(e) => setFormulario({ ...formulario, metodoPago: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Efectivo">💵 Efectivo</option>
                  <option value="Transferencia">🏦 Transferencia</option>
                  <option value="Nequi">📱 Nequi</option>
                  <option value="Daviplata">📱 Daviplata</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha del pago
                </label>
                <input
                  type="date"
                  value={formulario.fecha}
                  onChange={(e) => setFormulario({ ...formulario, fecha: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {formulario.clienteId && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <p className="text-sm text-green-700">
                    💵 Monto a cobrar:
                    <span className="font-bold ml-2">
                      {formatoPeso(precios[planCliente(Number(formulario.clienteId))])}
                    </span>
                  </p>
                </div>
              )}

            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setModalAbierto(false)}
                className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2 rounded-xl text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={registrarPago}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl text-sm transition-colors"
              >
                Registrar pago
              </button>
            </div>

          </div>
        </div>
      )}

    </AdminLayout>
    // ✅ CAMBIO: antes cerraba </div> — ahora cierra </AdminLayout>
  )
}

export default Pagos
