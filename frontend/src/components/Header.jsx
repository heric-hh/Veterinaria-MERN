import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {

    const {cerrarSesion} = useAuth();

  return (
    <header className="py-10 bg-indigo-600">
        <div className="px-10 mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="font-bold text-xl text-indigo-200 text-center">
                Administrador de Pacientes de <span className="text-white">Veterinaria</span>
            </h1>

            <nav className="flex flex-col items-center lg:flex-row gap-4 mt-6 lg:mt-0">
                <Link className="text-white text-sm uppercase font-bold" to="/admin">Pacientes</Link>
                <Link className="text-white text-sm uppercase font-bold" to="/perfil">Perfil</Link>
                <button 
                    type="button"
                    className="text-white text-sm uppercase font-bold"
                    onClick={cerrarSesion}
                > Cerrar Sesión </button>
            </nav>
        </div>
    </header>
  )
}

export default Header