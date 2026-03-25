// src/App.jsx
import { useState } from "react"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Clientes from "./pages/Clientes"
import WhatsAppButton from "./components/WhatsAppButton"

function App() {

  // Controla si estamos en área pública o privada
  const [seccion, setSeccion] = useState("landing")

  // Controla en qué página del panel admin estamos
  // Lo subimos aquí para que Sidebar pueda cambiar entre páginas
  const [paginaAdmin, setPaginaAdmin] = useState("dashboard")

  function navegarA(destino) {
    setSeccion(destino)
  }

  // Esta función se la pasamos al Sidebar
  // Cambia entre dashboard, clientes, pagos
  function cambiarPagina(pagina) {
    setPaginaAdmin(pagina)
  }

  // El área administrativa decide qué página mostrar
  // según el valor de paginaAdmin
  function renderAdmin() {
    if (paginaAdmin === "dashboard") {
      return (
        <Dashboard
          paginaActual={paginaAdmin}
          navegarA={cambiarPagina}
          onCerrarSesion={() => navegarA("landing")}
        />
      )
    }
    if (paginaAdmin === "clientes") {
      return (
        <Clientes
          paginaActual={paginaAdmin}
          navegarA={cambiarPagina}
          onCerrarSesion={() => navegarA("landing")}
        />
      )
    }
  }

  return (
    <div>
      {seccion === "landing" && (
        <Landing onIrALogin={() => navegarA("login")} />
      )}
      {seccion === "login" && (
        <Login onLoginExitoso={() => navegarA("admin")} />
      )}
      {seccion === "admin" && renderAdmin()}

      <WhatsAppButton />
    </div>
  )
}

export default App
