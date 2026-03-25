// Este archivo es nuestra "base de datos" temporal
// Simula exactamente lo que tendría el Excel del gym
// Más adelante esto se reemplaza por una base de datos real


export const clientesIniciales = [
    {
        id: 1,
        nombre: "Alexander Zabaleta",
        telefono:"3133635338",
        fechaInicio: "2025/03/01",
        fechaVencimineto:"2026/04/01",
        plan:"Pro",
        activo: true
    },
    {
    id: 2,
    nombre: "María Fernanda López",
    telefono: "3109876543",
    fechaInicio: "2025-03-10",
    fechaVencimiento: "2025-04-10",
    plan: "Básico",
    activo: true
  },
  {
    id: 3,
    nombre: "Juan Sebastián Torres",
    telefono: "3205556677",
    fechaInicio: "2025-02-01",
    fechaVencimiento: "2025-03-01",
    plan: "Premium",
    activo: false
  },
  {
    id: 4,
    nombre: "Valentina Ríos",
    telefono: "3154443322",
    fechaInicio: "2025-03-15",
    fechaVencimiento: "2025-04-15",
    plan: "Pro",
    activo: true
  },
  {
    id: 5,
    nombre: "Andrés Felipe Gómez",
    telefono: "3001112233",
    fechaInicio: "2025-03-20",
    fechaVencimiento: "2025-03-27",
    // Este vence en pocos días — perfecto para probar alertas
    plan: "Básico",
    activo: true
  },
  {
    id: 6,
    nombre: "Andrés Cutiva",
    telefono: "3001148533",
    fechaInicio: "2025-03-24",
    fechaVencimiento: "2025-04-27",
    // Este vence en pocos días — perfecto para probar alertas
    plan: "Básico",
    activo: true
  }
]

export const precios = {
  "Básico": 50000,
  "Pro": 80000,
  "Premium": 120000
}