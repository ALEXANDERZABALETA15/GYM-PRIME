import { useState } from 'react'
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import WhatsAppButton from './components/WhatAppButton'


function App() {

  // "pagina" guarda en qué pantalla estamos
  // Empieza en "landing" porque es lo primero que ve el usuario
  const [pagina, setPagina] = useState("landing")


  // Esta función se la pasamos al Login
  // Cuando el login sea exitoso, la llama y cambiamos a "dashboard"
  function navegarA(destino){
    setPagina(destino)
  }

  // Según el valor de "pagina", mostramos un componente u otro
  return (
    <div>
      {pagina === "landing" && <Landing onIrALogin={() => navegarA("login")} />}
      {pagina === "login" && <Login onLoginExitoso={() => navegarA("dashboard")} />}
      {pagina === "dashboard" && <Dasboard onCerrarSesion={() => navegarA("landing")} />}

      <WhatsAppButton />
    </div>
  )
}

export default App
