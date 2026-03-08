import bannerGym from "../assets/Banner horizontal web .png"

function Landing({onIrALogin}){
    return(
        // "overflow-x-hidden" evita scroll horizontal no deseado
        <div className="overflow-x-hidden">

            {/* NAVBAR — Barra de navegación */} 

            {/*sticky top-0  → se queda pegado arriba al hacer scroll*/}
            {/*z-10          → se dibuja por encima de otros elementos*/}
            <nav className="bg-red-600 shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">

            {/* Logo- nombre */}
            <h1 className="text-xl font-bold text-white">GYM PRIME</h1>

             {/* Links de navegación */}
            <ul className="hidden md:flex gap-8 text-sm text-white">
                <li className="hover:text-black cursor-pointer transition-colors duration-200 font-bold">Inicio</li>
                <li className="hover:text-black cursor-pointer transition-colors duration-200 font-bold">Nosotros</li>
                <li className="hover:text-black cursor-pointer transition-colors duration-200 font-bold">Servicios</li>
                <li className="hover:text-black cursor-pointer transition-colors duration-200 font-bold">Contactanos</li>
            </ul>

            {/* Botón ingresar */}
            <button onClick={onIrALogin} className=" text-white bg-black hover:bg-gray-600 text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 ">
                Ingresar
            </button>
            </nav>

            {/*BANNER — Sección principal (hero)*/}

            <section className="bg-linear-to-br from-gray-500 to-black text-white min-h-screen flex items-center justify-center px-6 bg-cover bg-center" style={{backgroundImage: `url(${bannerGym})`}} >
                <div className="text-center mx-auto  ">


                    <p className="text-white text-2xl font-bold uppercase tracking-widest mb-4">
                        {/* tracking-widest → espaciado entre letras muy amplio */}
                        BIENVENIDOS
                    </p>

                    <h2 className="text-5xl font-extrabold mb-4 leading-tight">
                        PRIME - <span className="text-red-600">CENTRO DE ENTRENAMIENTO.</span>
                    </h2>

                    <p className="text-white font-semibold text-lg mb-8 leading-relaxed">
                        TU MEJOR VERSIÓN EMPIEZA <span className="font-bold text-red-600">AQUÍ.</span>
                    </p>      

                    <button onClick={onIrALogin} className="bg-red-600 hover:bg-red-400 text-white font-bold px-8 py-3 rounded-xl transition-colors duration-200">
                        Acceder al sistema
                    </button>  

                </div>

            </section>

            {/* NOSOTROS — Sobre el gym */}

            <section className="py-20 px-6 bg-black border-t border-white">
        {/* py-20 → padding vertical de 80px, da aire a la sección */}

        <div className="max-w-4xl mx-auto">
          {/* mx-auto → centra el contenido horizontalmente */}

          {/* Encabezado de sección */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-3">
              ¿Quiénes somos?
            </h3>
            <p className="text-white max-w-xl mx-auto">
              Un espacio pensado para todos, sin importar tu nivel.
              Aquí cada persona tiene su ritmo y lo respetamos.
            </p>
          </div>

          {/* Tarjetas de valores */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-md transition-shadow duration-200">
              {/* bg-gray-50 → gris casi blanco, diferencia del fondo */}
              <p className="text-4xl mb-3">💪</p>
              <h4 className="font-bold text-gray-800 mb-2">Entrenamiento</h4>
              <p className="text-sm text-gray-500">
                Rutinas personalizadas para cada objetivo y nivel físico.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-md transition-shadow duration-200">
              <p className="text-4xl mb-3">🤝</p>
              <h4 className="font-bold text-gray-800 mb-2">Comunidad</h4>
              <p className="text-sm text-gray-500">
                Un ambiente familiar donde todos se apoyan mutuamente.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-md transition-shadow duration-200">
              <p className="text-4xl mb-3">📈</p>
              <h4 className="font-bold text-gray-800 mb-2">Progreso</h4>
              <p className="text-sm text-gray-500">
                Seguimiento real de tu avance semana a semana.
              </p>
            </div>

          </div>
        </div>
      </section>
            
            {/* SERVICIOS */}
      <section className="py-20 px-6 bg-black border-t border-white">

        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-3">
              Nuestros servicios
            </h3>
            <p className="text-white">
              Todo lo que necesitas en un solo lugar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Cada servicio es una tarjeta con borde izquierdo de color */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-blue-500">
              {/*
                border-l-4      → borde solo en el lado izquierdo, 4px
                border-blue-500 → color azul
              */}
              <h4 className="font-bold text-gray-800 mb-1">🏋️ Pesas y musculación</h4>
              <p className="text-sm text-gray-500">Equipos completos para tu entrenamiento de fuerza.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-green-500">
              <h4 className="font-bold text-gray-800 mb-1">🚴 Cardio</h4>
              <p className="text-sm text-gray-500">Bicicletas, cintas y más para quemar calorías.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-yellow-500">
              <h4 className="font-bold text-gray-800 mb-1">🧘 Clases grupales</h4>
              <p className="text-sm text-gray-500">Zumba, yoga y funcional con instructores certificados.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-purple-500">
              <h4 className="font-bold text-gray-800 mb-1">🥗 Asesoría nutricional</h4>
              <p className="text-sm text-gray-500">Plan alimenticio acorde a tus metas físicas.</p>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════
           FOOTER
          ═══════════════════════════════ */}
      <footer className="bg-red-600 text-gray-400 px-6 py-10">
        {/* bg-gray-800 → fondo oscuro clásico de footer */}

        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo en el footer */}
          <div>
            <h1 className="text-white font-bold text-lg">GYM PRIME</h1>
            <p className="text-sm mt-1 text-white font-semibold">Tu verdadero cambio empieza aquí.</p>
          </div>

          {/* Info de contacto */}
          <div className="text-sm text-center sm:text-right text-white font-semibold">
            <p>📍 Cra 4 estadio 31-94</p>
            <p className="mt-1">📞 +57 321 350 2385</p>
            <p className="mt-1">✉️ contacto@gymapp.com</p>
          </div>

        </div>

        {/* Línea divisoria y copyright */}
        <div className="max-w-4xl mx-auto border-t border-gray-700 mt-8 pt-6 text-center text-xs">
          {/*
            border-t          → borde solo en la parte superior
            border-gray-700   → color gris oscuro para la línea
            text-xs           → texto muy pequeño (12px)
          */}
          <p className="text-white font-semibold">© 2026 Gym PRIME. Todos los derechos reservados.</p>
        </div>

      </footer>


        </div>

          







    )
}

export default Landing