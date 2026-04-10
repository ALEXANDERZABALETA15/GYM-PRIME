// src/data/clientes.js
// Archivo central de datos — aquí viven todos los datos del sistema

// ── CLIENTES ─────────────────────────────────────────
export const clientesIniciales = [
  {
    id: 1,
    nombre: "Alexander Zabaleta",
    telefono: "3133635338",
    fechaInicio: "2025-03-01",
    fechaVencimiento: "2026-04-01",
    plan: "Pro",
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
    plan: "Básico",
    activo: true
  },
  {
    id: 6,
    nombre: "Andrés Cutiva",
    telefono: "3001148533",
    fechaInicio: "2025-03-24",
    fechaVencimiento: "2025-04-27",
    plan: "Básico",
    activo: true
  }
]

// ── PRECIOS DE PLANES ─────────────────────────────────
export const precios = {
  "Básico":   50000,
  "Pro":      80000,
  "Premium": 120000
}

// ── PAGOS ─────────────────────────────────────────────
export const pagosIniciales = [
  {
    id: 1,
    clienteId: 1,
    monto: 80000,
    fecha: "2025-03-01",
    mes: "2025-03",
    metodoPago: "Efectivo"
  },
  {
    id: 2,
    clienteId: 2,
    monto: 50000,
    fecha: "2025-03-10",
    mes: "2025-03",
    metodoPago: "Transferencia"
  },
  {
    id: 3,
    clienteId: 4,
    monto: 80000,
    fecha: "2025-03-15",
    mes: "2025-03",
    metodoPago: "Efectivo"
  },
  {
    id: 4,
    clienteId: 5,
    monto: 50000,
    fecha: "2025-03-20",
    mes: "2025-03",
    metodoPago: "Efectivo"
  }
]

// ── INVENTARIO ────────────────────────────────────────
export const inventarioInicial = [
  // BEBIDAS
  {
    id: 1,
    nombre: "Agua 600ml",
    categoria: "Bebidas",
    precio: 2000,
    costo: 1200,
    stock: 48,
    stockMinimo: 10,
    unidad: "unidad",
    descripcion: "Agua purificada 600ml"
  },
  {
    id: 2,
    nombre: "Agua 1.5L",
    categoria: "Bebidas",
    precio: 3500,
    costo: 2000,
    stock: 24,
    stockMinimo: 8,
    unidad: "unidad",
    descripcion: "Agua purificada 1.5 litros"
  },
  {
    id: 3,
    nombre: "Energizante Monster",
    categoria: "Bebidas",
    precio: 8000,
    costo: 5500,
    stock: 12,
    stockMinimo: 5,
    unidad: "unidad",
    descripcion: "Bebida energizante 473ml"
  },
  // PROTEÍNAS
  {
    id: 4,
    nombre: "Proteína Whey 1kg",
    categoria: "Proteínas",
    precio: 120000,
    costo: 85000,
    stock: 6,
    stockMinimo: 3,
    unidad: "kg",
    descripcion: "Proteína de suero de leche 1kg"
  },
  {
    id: 5,
    nombre: "Proteína Whey 2kg",
    categoria: "Proteínas",
    precio: 220000,
    costo: 160000,
    stock: 4,
    stockMinimo: 2,
    unidad: "kg",
    descripcion: "Proteína de suero de leche 2kg"
  },
  // CREATINAS
  {
    id: 6,
    nombre: "Creatina Monohidrato 300g",
    categoria: "Creatinas",
    precio: 65000,
    costo: 42000,
    stock: 8,
    stockMinimo: 3,
    unidad: "unidad",
    descripcion: "Creatina monohidrato pura 300g"
  },
  {
    id: 7,
    nombre: "Creatina Monohidrato 500g",
    categoria: "Creatinas",
    precio: 95000,
    costo: 68000,
    stock: 2,
    stockMinimo: 3,
    unidad: "unidad",
    descripcion: "Creatina monohidrato pura 500g"
  },
  // PRE ENTRENOS
  {
    id: 8,
    nombre: "Pre Entreno C4 Original",
    categoria: "Pre Entrenos",
    precio: 110000,
    costo: 78000,
    stock: 5,
    stockMinimo: 2,
    unidad: "unidad",
    descripcion: "Pre entreno C4 Original 30 servicios"
  },
  {
    id: 9,
    nombre: "Pre Entreno Nitraflex",
    categoria: "Pre Entrenos",
    precio: 130000,
    costo: 92000,
    stock: 1,
    stockMinimo: 2,
    unidad: "unidad",
    descripcion: "Pre entreno GAT Nitraflex 30 servicios"
  },
  // AMINOÁCIDOS
  {
    id: 10,
    nombre: "BCAA 2:1:1 300g",
    categoria: "Aminoácidos",
    precio: 75000,
    costo: 52000,
    stock: 7,
    stockMinimo: 3,
    unidad: "unidad",
    descripcion: "Aminoácidos ramificados BCAA 300g"
  },
  {
    id: 11,
    nombre: "Glutamina 300g",
    categoria: "Aminoácidos",
    precio: 68000,
    costo: 46000,
    stock: 4,
    stockMinimo: 2,
    unidad: "unidad",
    descripcion: "L-Glutamina pura 300g"
  },
  // OTROS
  {
    id: 12,
    nombre: "Barra de Proteína",
    categoria: "Otros",
    precio: 8500,
    costo: 5500,
    stock: 20,
    stockMinimo: 8,
    unidad: "unidad",
    descripcion: "Barra proteica 60g"
  }
]

// ── VENTAS ────────────────────────────────────────────
export const ventasInicial = [
  {
    id: 1,
    productoId: 1,
    nombreProducto: "Agua 600ml",
    categoria: "Bebidas",
    cantidad: 3,
    precioUnitario: 2000,
    total: 6000,
    fecha: "2025-03-25",
    hora: "08:30",
    metodoPago: "Efectivo"
  },
  {
    id: 2,
    productoId: 4,
    nombreProducto: "Proteína Whey 1kg",
    categoria: "Proteínas",
    cantidad: 1,
    precioUnitario: 120000,
    total: 120000,
    fecha: "2025-03-25",
    hora: "10:15",
    metodoPago: "Nequi"
  },
  {
    id: 3,
    productoId: 6,
    nombreProducto: "Creatina Monohidrato 300g",
    categoria: "Creatinas",
    cantidad: 1,
    precioUnitario: 65000,
    total: 65000,
    fecha: "2025-03-26",
    hora: "14:45",
    metodoPago: "Efectivo"
  },
  {
    id: 4,
    productoId: 3,
    nombreProducto: "Energizante Monster",
    categoria: "Bebidas",
    cantidad: 2,
    precioUnitario: 8000,
    total: 16000,
    fecha: "2025-03-26",
    hora: "16:00",
    metodoPago: "Transferencia"
  }
]