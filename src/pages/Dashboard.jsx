function Dasboard({onCerrarSesion}) {
    return(
        <div className="min-h-screen bg-black">

            {/*NAVBAR - BARRA SUPERIOR */}
            <nav className="bg-red-600 shadow-sm px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <h1 className="text-xl font-bold text-white"> GYM PRIME </h1>

                <button onClick={onCerrarSesion} className="text-sm text-white hover:text-red-500 transition-colors duration-200">
                    Cerrar sesión
                </button>
            </nav>

        {/*CONTENIDO PRINCIPAL */}
        <main className="p-6 ">

            {/*Saludo */}
            <h2 className="text-3xl font-bold text-white mb-1">
                BUEN DIA, ADMINISTRADOR 👋.
            </h2>
            <p className="text-white mb-6 font-bold">
                Resumen del gimnasio
            </p>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                {/*TARJETA 1 -Socios activos */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <p className="text-4xl font-bold text-black">24</p>
                    <p className="text-black mt-1 text-sm">Socios activos</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <p className="text-4xl font-bold text-black">480.000</p>
                    <p className="text-black mt-1 text-sm">Recaudos este mes.</p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <p className="text-4xl font-bold text-black">5</p>
                    <p className="text-black mt-1 text-sm">Membresías por vencer</p>
                </div>

            </div>

            {/* SECCIÓN ACCESOS RÁPIDOS */}
            <h3 className="text-lg font-semibold text-white mt-8 mb-4">
                Accesos rapidos
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Botón ir a Clientes */}
                <button className="bg-white rounded-2xl shadow-sm p-6 text-left hover:shadow-md transition-shadow duration-200">
                    <p className="text-2xl mb-2">👥</p>
                    <p className="font-semibold text-gray-800">Gestionar Clientes</p>
                    <p className="text-sm text-gray-500 mt-1">Ver, agregar y editar socios</p>
                </button>

                {/* Botón ir a Pagos */}
                <button className="bg-white rounded-2xl shadow-sm p-6 text-left hover:shadow-md transition-shadow duration-200">
                    <p className="text-2xl mb-2">💰</p>
                    <p className="font-semibold text-gray-800">Gestionar Pagos</p>
                    <p className="text-sm text-gray-500 mt-1">Registrar y revisar cobros</p>
                </button>
            </div>

        </main>
        </div>
    )
}

export default Dasboard