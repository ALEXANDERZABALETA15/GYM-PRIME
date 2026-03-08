
// useState es un "hook" de React — nos permite guardar y actualizar datos
import { useState } from "react";

// Recibimos "onLoginExitoso" como prop desde App.jsx
// Es la función que cambia la pantalla
function Login({onLoginExitoso}) {
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    //Manejar el inicio de sesion.
    function handleLogin() {
        if (email === "" || password === ""){
            setError("Por favor complete todo los campos.")
            return
        }

        if (email === "admin@gym.com" && password === "1234"){
            setError("")
            onLoginExitoso() // ← Llama a la función que nos pasó App.jsx Esto cambia "pagina" a "dashboard"
        } else{
            setError("Correo o contraseña incorrectos.")
        }
    }

return (
    // Contenedor principal — ocupa toda la pantalla y centra el contenido
    <div className="min-h-screen bg-black flex items-center justify-center">

      {/* Tarjeta del formulario */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        {/* Encabezado */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">GYM PRIME 🏋️.</h1>
          <p className="text-gray-500 font-bold mt-1">Ingresa a tu cuenta</p>
        </div>

        {/* Mensaje de error — solo aparece si "error" tiene contenido */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Campo Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="admin@gym.com"
            value={email}
            // onChange se dispara cada vez que el usuario escribe algo
            // e.target.value es lo que hay escrito en ese momento
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo Contraseña */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botón de ingreso */}
        <button
          onClick={handleLogin}
          // onClick le dice a React: "cuando hagan click, ejecuta handleLogin"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
        >
          Ingresar
        </button>

      </div>
    </div>
  )
}





export default Login