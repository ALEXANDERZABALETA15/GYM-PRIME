// src/pages/Dashboard.jsx
// Panel principal — muestra resumen del gym en tiempo real
// Toda la info se calcula automáticamente desde los datos de clientes

import { useState } from "react"
import AdminLayout from "../components/AdminLayout"
import { clientesIniciales, precios } from "../data/clientes"

function Dashboard({ paginaActual, navegarA, onCerrarSesion }) {

  
  const [clientes] = useState(clientesIniciales)

  // ── CÁLCULOS AUTOMÁTICOS ──────────────────────────────
  // Toda esta lógica lee los datos y saca números útiles

  // Fecha de hoy sin hora (para comparar solo fechas)
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  // Clientes activos = los que tienen activo: true
  const clientesActivos = clientes.filter(c => c.activo)
  // .filter() devuelve un nuevo array solo con los que cumplen la condición

  // Vencidos = fecha de vencimiento ya pasó
  const clientesVencidos = clientes.filter(c => {
    const vence = new Date(c.fechaVencimiento)
    return vence < hoy
    // retorna true si la fecha de vencimiento es anterior a hoy
  })

  // Por vencer = vencen en los próximos 7 días
  const porVencer = clientes.filter(c => {
    const vence = new Date(c.fechaVencimiento)
    const diff = (vence - hoy) / (1000 * 60 * 60 * 24)
    // diff = diferencia en días
    // (vence - hoy) da milisegundos → dividimos para convertir a días
    return diff >= 0 && diff <= 7
  })

  // Ingresos del mes = suma de precios de clientes activos
  const ingresosMes = clientesActivos.reduce((total, c) => {
    return total + (precios[c.plan] || 0)
    // .reduce() acumula un valor recorriendo el array
    // total empieza en 0 y suma el precio de cada cliente
  }, 0)

  // Formato de moneda colombiana
  const formatoPeso = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
    }).format(valor)
  // Intl.NumberFormat → API nativa del navegador para formatear números

  // ── TARJETAS DEL DASHBOARD ───────────────────────────
  const tarjetas = [
    {
      label: "Socios activos",
      valor: clientesActivos.length,
      icono: "👥",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Ingresos del mes",
      valor: formatoPeso(ingresosMes),
      icono: "💰",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      label: "Por vencer (7 días)",
      valor: porVencer.length,
      icono: "⚠️",
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
    {
      label: "Membresías vencidas",
      valor: clientesVencidos.length,
      icono: "❌",
      color: "text-red-500",
      bg: "bg-red-50"
    },
  ]

 return (
    // Reemplaza el <div className="flex h-screen..."> y el <Sidebar> y el <main>
    // por este AdminLayout que los contiene todos
    <AdminLayout
      paginaActual={paginaActual}
      navegarA={navegarA}
      onCerrarSesion={onCerrarSesion}
    >
      {/* Todo el contenido del dashboard va aquí dentro */}
      {/* Desde el encabezado "Buenos días Admin" hasta el final */}

      {/* Encabezado */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Buenos días, Admin 👋
        </h2>
        <p className="text-gray-500 mt-1">
          {hoy.toLocaleDateString("es-CO", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </p>
      </div>

      {/* Tarjetas — en móvil 1 columna, tablet 2, desktop 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {tarjetas.map((t, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${t.bg} mb-4`}>
              <span className="text-2xl">{t.icono}</span>
            </div>
            <p className={`text-2xl font-bold ${t.color}`}>{t.valor}</p>
            <p className="text-sm text-gray-500 mt-1">{t.label}</p>
          </div>
        ))}
      </div>

      {/* Alertas de vencimiento */}
      {porVencer.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-orange-700 mb-3">
            ⚠️ Membresías por vencer esta semana
          </h3>
          <div className="space-y-2">
            {porVencer.map(c => {
              const vence = new Date(c.fechaVencimiento)
              const diff  = Math.ceil((vence - hoy) / (1000 * 60 * 60 * 24))
              return (
                <div key={c.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-800">{c.nombre}</p>
                    <p className="text-xs text-gray-500">Plan {c.plan} · 📞 {c.telefono}</p>
                  </div>
                  <span className="text-sm font-semibold text-orange-600">
                    {diff === 0 ? "Vence hoy" : `${diff} día${diff > 1 ? "s" : ""}`}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Tabla resumen */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-4">👥 Clientes recientes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Nombre</th>
                <th className="pb-3 font-medium">Plan</th>
                <th className="pb-3 font-medium">Vencimiento</th>
                <th className="pb-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clientes.slice(0, 5).map(c => {
                const vence   = new Date(c.fechaVencimiento)
                const vencido = vence < hoy
                return (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-medium text-gray-800">{c.nombre}</td>
                    <td className="py-3 text-gray-500">{c.plan}</td>
                    <td className="py-3 text-gray-500">
                      {vence.toLocaleDateString("es-CO")}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${vencido
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                        }`}>
                        {vencido ? "Vencido" : "Activo"}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  )
}

export default Dashboard