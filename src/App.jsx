// src/App.jsx
import { useState } from "react"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Clientes from "./pages/Clientes"
import Pagos from "./pages/Pagos"
import WhatsAppButton from "./components/WhatsAppButton"

function App() {

  const [seccion, setSeccion] = useState("landing")
  const [paginaAdmin, setPaginaAdmin] = useState("dashboard")

  function navegarA(destino) {
    setSeccion(destino)
  }

  function cambiarPagina(pagina) {
    setPaginaAdmin(pagina)
  }

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
    if (paginaAdmin === "pagos") {
      return (
        <Pagos
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