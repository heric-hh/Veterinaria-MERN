import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {
    
    const {auth, cargando} = useAuth();
    
    if(cargando) {
        return "cargando...";
    }
    return (
        <>  
            <Header />
                {auth && (auth._id || auth.veterinario) ? (
                    <main className="mx-10 mt-10">
                        <Outlet />
                    </main>
                ) : <Navigate to="/" />}
            <Footer />
        </>
    );
}

export default RutaProtegida;