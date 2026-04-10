// src/pages/Inventario.jsx
// Módulo completo de inventario
// Funcionalidades:
// - Ver productos con stock, precio y categoría
// - Buscar productos por nombre
// - Filtrar por categoría
// - Agregar, editar y eliminar productos
// - Registrar ventas con cantidad desde la tabla
// - Historial de ventas por día y hora
// - Alertas de stock bajo

import { useState } from "react"
import AdminLayout from "../components/AdminLayout"
import { inventarioInicial, ventasInicial } from "../data/clientes"

function Inventario({ paginaActual, navegarA, onCerrarSesion }) {

  // ── ESTADO PRINCIPAL ─────────────────────────────────
  const [productos, setProductos]   = useState(inventarioInicial)
  const [ventas, setVentas]         = useState(ventasInicial)
  const [busqueda, setBusqueda]     = useState("")
  const [filtro, setFiltro]         = useState("Todos")
  const [vista, setVista]           = useState("inventario")
  // vista → "inventario" muestra productos, "historial" muestra ventas

  const [modalProducto, setModalProducto]   = useState(false)
  const [modalVenta, setModalVenta]         = useState(false)
  const [productoEditando, setProductoEditando] = useState(null)
  const [productoVenta, setProductoVenta]   = useState(null)
  // productoVenta → el producto seleccionado para vender

  // Formulario de producto
  const [formProducto, setFormProducto] = useState({
    nombre: "", categoria: "Bebidas", precio: "",
    costo: "", stock: "", stockMinimo: "",
    unidad: "unidad", descripcion: ""
  })

  // Formulario de venta
  const [formVenta, setFormVenta] = useState({
    cantidad: 1, metodoPago: "Efectivo"
  })

  // ── CATEGORÍAS DISPONIBLES ────────────────────────────
  const categorias = ["Todos", "Bebidas", "Proteínas", "Creatinas", "Pre Entrenos", "Aminoácidos", "Otros"]

  // ── HELPERS ──────────────────────────────────────────

  function formatoPeso(valor) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency", currency: "COP", minimumFractionDigits: 0
    }).format(valor)
  }

  function fechaHoraActual() {
    const ahora = new Date()
    const fecha = ahora.toISOString().split("T")[0]
    // toISOString → "2025-03-25T10:30:00.000Z"
    // split("T")[0] → "2025-03-25"
    const hora  = `${String(ahora.getHours()).padStart(2,"0")}:${String(ahora.getMinutes()).padStart(2,"0")}`
    // getHours() → 10, padStart → "10"
    // getMinutes() → 5, padStart → "05"
    return { fecha, hora }
  }

  // ── FILTROS Y BÚSQUEDA ────────────────────────────────

  const productosFiltrados = productos
    .filter(p => filtro === "Todos" ? true : p.categoria === filtro)
    // si filtro es "Todos" → muestra todos
    // si no → solo los de esa categoría
    .filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      // busca en nombre Y descripción
    )

  // ── ESTADÍSTICAS ──────────────────────────────────────

  const productosStockBajo = productos.filter(p => p.stock <= p.stockMinimo)
  // stock <= stockMinimo → necesita reabastecimiento

  const valorTotalInventario = productos.reduce((total, p) => {
    return total + (p.precio * p.stock)
    // valor total = precio × unidades disponibles de cada producto
  }, 0)

  const ventasHoy = ventas.filter(v => {
    const hoy = new Date().toISOString().split("T")[0]
    return v.fecha === hoy
  })

  const totalVentasHoy = ventasHoy.reduce((total, v) => total + v.total, 0)

  // ── CRUD PRODUCTOS ────────────────────────────────────

  function abrirModalNuevoProducto() {
    setProductoEditando(null)
    setFormProducto({
      nombre: "", categoria: "Bebidas", precio: "",
      costo: "", stock: "", stockMinimo: "",
      unidad: "unidad", descripcion: ""
    })
    setModalProducto(true)
  }

  function abrirModalEditarProducto(producto) {
    setProductoEditando(producto)
    setFormProducto({
      nombre:      producto.nombre,
      categoria:   producto.categoria,
      precio:      producto.precio,
      costo:       producto.costo,
      stock:       producto.stock,
      stockMinimo: producto.stockMinimo,
      unidad:      producto.unidad,
      descripcion: producto.descripcion
    })
    setModalProducto(true)
  }

  function guardarProducto() {
    if (!formProducto.nombre || !formProducto.precio || !formProducto.stock) {
      alert("Por favor completa nombre, precio y stock.")
      return
    }
    if (productoEditando) {
      // Editar producto existente
      setProductos(productos.map(p =>
        p.id === productoEditando.id
          ? { ...p, ...formProducto,
              precio:      Number(formProducto.precio),
              costo:       Number(formProducto.costo),
              stock:       Number(formProducto.stock),
              stockMinimo: Number(formProducto.stockMinimo)
              // Number() → convierte los valores del input (string) a número
            }
          : p
      ))
    } else {
      // Crear producto nuevo
      setProductos([...productos, {
        id:          Date.now(),
        ...formProducto,
        precio:      Number(formProducto.precio),
        costo:       Number(formProducto.costo),
        stock:       Number(formProducto.stock),
        stockMinimo: Number(formProducto.stockMinimo)
      }])
    }
    setModalProducto(false)
  }

  function eliminarProducto(id) {
    if (!window.confirm("¿Eliminar este producto?")) return
    setProductos(productos.filter(p => p.id !== id))
  }

  // ── REGISTRAR VENTA ───────────────────────────────────

  function abrirModalVenta(producto) {
    setProductoVenta(producto)
    setFormVenta({ cantidad: 1, metodoPago: "Efectivo" })
    setModalVenta(true)
  }

  function confirmarVenta() {
    const cantidad = Number(formVenta.cantidad)

    if (cantidad <= 0) {
      alert("La cantidad debe ser mayor a 0.")
      return
    }
    if (cantidad > productoVenta.stock) {
      alert(`Stock insuficiente. Solo hay ${productoVenta.stock} unidades.`)
      return
    }

    const { fecha, hora } = fechaHoraActual()

    // 1. Registrar la venta en el historial
    const nuevaVenta = {
      id:             Date.now(),
      productoId:     productoVenta.id,
      nombreProducto: productoVenta.nombre,
      categoria:      productoVenta.categoria,
      cantidad,
      precioUnitario: productoVenta.precio,
      total:          productoVenta.precio * cantidad,
      // total = precio unitario × cantidad vendida
      fecha,
      hora,
      metodoPago:     formVenta.metodoPago
    }
    setVentas([...ventas, nuevaVenta])

    // 2. Descontar del stock del producto
    setProductos(productos.map(p =>
      p.id === productoVenta.id
        ? { ...p, stock: p.stock - cantidad }
        // stock nuevo = stock actual - cantidad vendida
        : p
    ))

    setModalVenta(false)
  }

  // ── VISTA ─────────────────────────────────────────────

  return (
    <AdminLayout
      paginaActual={paginaActual}
      navegarA={navegarA}
      onCerrarSesion={onCerrarSesion}
    >

      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">📦 Inventario</h2>
          <p className="text-gray-500 text-sm mt-1">
            Productos, stock y ventas
          </p>
        </div>
        <button
          onClick={abrirModalNuevoProducto}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors duration-200"
        >
          + Agregar producto
        </button>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 mb-3">
            <span className="text-xl">💰</span>
          </div>
          <p className="text-xl font-bold text-blue-600">{formatoPeso(valorTotalInventario)}</p>
          <p className="text-xs text-gray-500 mt-1">Valor total inventario</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-green-50 mb-3">
            <span className="text-xl">📦</span>
          </div>
          <p className="text-xl font-bold text-green-600">{productos.length}</p>
          <p className="text-xs text-gray-500 mt-1">Productos registrados</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-orange-50 mb-3">
            <span className="text-xl">⚠️</span>
          </div>
          <p className="text-xl font-bold text-orange-500">{productosStockBajo.length}</p>
          <p className="text-xs text-gray-500 mt-1">Productos stock bajo</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-purple-50 mb-3">
            <span className="text-xl">🛒</span>
          </div>
          <p className="text-xl font-bold text-purple-600">{formatoPeso(totalVentasHoy)}</p>
          <p className="text-xs text-gray-500 mt-1">Ventas de hoy</p>
        </div>

      </div>

      {/* Alertas stock bajo */}
      {productosStockBajo.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-6">
          <h3 className="font-bold text-orange-700 mb-3">
            ⚠️ Productos con stock bajo — necesitan reabastecimiento
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {productosStockBajo.map(p => (
              <div key={p.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{p.nombre}</p>
                  <p className="text-xs text-gray-500">{p.categoria}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-orange-600">{p.stock} unid.</p>
                  <p className="text-xs text-gray-400">mín: {p.stockMinimo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs — Inventario / Historial */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setVista("inventario")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors
            ${vista === "inventario"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
            }`}
        >
          📦 Productos
        </button>
        <button
          onClick={() => setVista("historial")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors
            ${vista === "historial"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
            }`}
        >
          🛒 Historial de ventas
        </button>
      </div>

      {/* ── VISTA INVENTARIO ─────────────────────────── */}
      {vista === "inventario" && (
        <>
          {/* Buscador y filtros de categoría */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 flex flex-col gap-3">

            <input
              type="text"
              placeholder="🔍 Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Filtros por categoría — scroll horizontal en móvil */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {/*
                overflow-x-auto → scroll horizontal si no caben todos los filtros
                pb-1 → pequeño padding para que no se corte el scroll
              */}
              {categorias.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFiltro(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors
                    ${filtro === cat
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  // whitespace-nowrap → evita que el texto del botón se parta
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* Tabla de productos */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr className="text-left text-gray-500">
                    <th className="px-5 py-4 font-medium">Producto</th>
                    <th className="px-5 py-4 font-medium">Categoría</th>
                    <th className="px-5 py-4 font-medium">Stock</th>
                    <th className="px-5 py-4 font-medium">Precio venta</th>
                    <th className="px-5 py-4 font-medium">Ganancia</th>
                    <th className="px-5 py-4 font-medium">Acciones</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {productosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-gray-400">
                        No se encontraron productos.
                      </td>
                    </tr>
                  ) : (
                    productosFiltrados.map(p => {
                      const ganancia  = p.precio - p.costo
                      const stockBajo = p.stock <= p.stockMinimo
                      return (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">

                          <td className="px-5 py-4">
                            <p className="font-medium text-gray-800">{p.nombre}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{p.descripcion}</p>
                          </td>

                          <td className="px-5 py-4">
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
                              {p.categoria}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${stockBajo ? "text-orange-500" : "text-gray-800"}`}>
                                {p.stock}
                              </span>
                              {stockBajo && (
                                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                                  ⚠️ bajo
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400">mín: {p.stockMinimo}</p>
                          </td>

                          <td className="px-5 py-4 font-semibold text-gray-800">
                            {formatoPeso(p.precio)}
                          </td>

                          <td className="px-5 py-4 font-semibold text-green-600">
                            {formatoPeso(ganancia)}
                            {/* ganancia por unidad = precio venta - costo */}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex gap-1 flex-wrap">
                              {/* Botón vender */}
                              <button
                                onClick={() => abrirModalVenta(p)}
                                disabled={p.stock === 0}
                                // disabled → botón desactivado si no hay stock
                                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                              >
                                🛒 Vender
                              </button>
                              {/* Botón editar */}
                              <button
                                onClick={() => abrirModalEditarProducto(p)}
                                className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                              >
                                ✏️
                              </button>
                              {/* Botón eliminar */}
                              <button
                                onClick={() => eliminarProducto(p.id)}
                                className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                              >
                                🗑️
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
        </>
      )}

      {/* ── VISTA HISTORIAL DE VENTAS ────────────────── */}
      {vista === "historial" && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-gray-500">
                  <th className="px-5 py-4 font-medium">Producto</th>
                  <th className="px-5 py-4 font-medium">Categoría</th>
                  <th className="px-5 py-4 font-medium">Cantidad</th>
                  <th className="px-5 py-4 font-medium">Precio unit.</th>
                  <th className="px-5 py-4 font-medium">Total</th>
                  <th className="px-5 py-4 font-medium">Fecha y hora</th>
                  <th className="px-5 py-4 font-medium">Método</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {ventas.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-gray-400">
                      No hay ventas registradas.
                    </td>
                  </tr>
                ) : (
                  // Ordenamos las ventas de más reciente a más antigua
                  [...ventas]
                    .sort((a, b) => {
                      // Comparamos fecha+hora como string: "2025-03-25 14:30"
                      const fechaA = `${a.fecha} ${a.hora}`
                      const fechaB = `${b.fecha} ${b.hora}`
                      return fechaB.localeCompare(fechaA)
                      // localeCompare → compara strings alfabéticamente
                      // fechaB - fechaA → orden descendente (más reciente primero)
                    })
                    .map(v => (
                      <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 font-medium text-gray-800">
                          {v.nombreProducto}
                        </td>
                        <td className="px-5 py-4">
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
                            {v.categoria}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-600">
                          {v.cantidad} unid.
                        </td>
                        <td className="px-5 py-4 text-gray-600">
                          {formatoPeso(v.precioUnitario)}
                        </td>
                        <td className="px-5 py-4 font-bold text-green-600">
                          {formatoPeso(v.total)}
                        </td>
                        <td className="px-5 py-4 text-gray-500">
                          <p>{v.fecha}</p>
                          <p className="text-xs text-gray-400">{v.hora}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold
                            ${v.metodoPago === "Efectivo"
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 text-blue-600"
                            }`}>
                            {v.metodoPago}
                          </span>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>

            </table>
          </div>
        </div>
      )}

      {/* ── MODAL PRODUCTO — Crear / Editar ──────────── */}
      {modalProducto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-screen overflow-y-auto">
            {/* max-h-screen overflow-y-auto → scroll si el modal es muy largo en móvil */}

            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800">
                {productoEditando ? "✏️ Editar producto" : "➕ Nuevo producto"}
              </h3>
              <button onClick={() => setModalProducto(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" value={formProducto.nombre}
                  onChange={e => setFormProducto({ ...formProducto, nombre: e.target.value })}
                  placeholder="Ej: Proteína Whey 1kg"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <input type="text" value={formProducto.descripcion}
                  onChange={e => setFormProducto({ ...formProducto, descripcion: e.target.value })}
                  placeholder="Ej: Proteína de suero de leche 1kg"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select value={formProducto.categoria}
                    onChange={e => setFormProducto({ ...formProducto, categoria: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {categorias.filter(c => c !== "Todos").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                  <select value={formProducto.unidad}
                    onChange={e => setFormProducto({ ...formProducto, unidad: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="unidad">Unidad</option>
                    <option value="kg">Kilogramo</option>
                    <option value="litro">Litro</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio venta ($)</label>
                  <input type="number" value={formProducto.precio}
                    onChange={e => setFormProducto({ ...formProducto, precio: e.target.value })}
                    placeholder="Ej: 120000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Costo compra ($)</label>
                  <input type="number" value={formProducto.costo}
                    onChange={e => setFormProducto({ ...formProducto, costo: e.target.value })}
                    placeholder="Ej: 85000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock actual</label>
                  <input type="number" value={formProducto.stock}
                    onChange={e => setFormProducto({ ...formProducto, stock: e.target.value })}
                    placeholder="Ej: 10"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock mínimo</label>
                  <input type="number" value={formProducto.stockMinimo}
                    onChange={e => setFormProducto({ ...formProducto, stockMinimo: e.target.value })}
                    placeholder="Ej: 3"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Vista previa de ganancia */}
              {formProducto.precio && formProducto.costo && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <p className="text-sm text-green-700">
                    💰 Ganancia por unidad:
                    <span className="font-bold ml-2">
                      {formatoPeso(Number(formProducto.precio) - Number(formProducto.costo))}
                    </span>
                  </p>
                </div>
              )}

            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModalProducto(false)}
                className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2 rounded-xl text-sm transition-colors">
                Cancelar
              </button>
              <button onClick={guardarProducto}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl text-sm transition-colors">
                {productoEditando ? "Guardar cambios" : "Agregar producto"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── MODAL VENTA ──────────────────────────────── */}
      {modalVenta && productoVenta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">

            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800">🛒 Registrar venta</h3>
              <button onClick={() => setModalVenta(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            {/* Info del producto */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="font-semibold text-gray-800">{productoVenta.nombre}</p>
              <p className="text-sm text-gray-500 mt-1">{productoVenta.categoria}</p>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-500">
                  Stock disponible: <strong>{productoVenta.stock}</strong>
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {formatoPeso(productoVenta.precio)} / unid.
                </span>
              </div>
            </div>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad
                </label>
                <input
                  type="number"
                  min="1"
                  max={productoVenta.stock}
                  value={formVenta.cantidad}
                  onChange={e => setFormVenta({ ...formVenta, cantidad: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Método de pago
                </label>
                <select
                  value={formVenta.metodoPago}
                  onChange={e => setFormVenta({ ...formVenta, metodoPago: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Efectivo">💵 Efectivo</option>
                  <option value="Transferencia">🏦 Transferencia</option>
                  <option value="Nequi">📱 Nequi</option>
                  <option value="Daviplata">📱 Daviplata</option>
                </select>
              </div>

              {/* Total a cobrar */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                <p className="text-sm text-blue-700">
                  💵 Total a cobrar:
                  <span className="font-bold ml-2 text-lg">
                    {formatoPeso(productoVenta.precio * Number(formVenta.cantidad))}
                  </span>
                </p>
              </div>

            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModalVenta(false)}
                className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2 rounded-xl text-sm transition-colors">
                Cancelar
              </button>
              <button onClick={confirmarVenta}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl text-sm transition-colors">
                Confirmar venta
              </button>
            </div>

          </div>
        </div>
      )}

    </AdminLayout>
  )
}

export default Inventario