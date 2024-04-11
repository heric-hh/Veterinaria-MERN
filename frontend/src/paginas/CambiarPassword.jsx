import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";


const CambiarPassword = () => {

    const {guardarPassword} = useAuth();

    const [password, setPassword] = useState({
        "password_actual": "",
        "password_nueva": ""
    });
    const [alerta, setAlerta] = useState({});

    const {msg} = alerta;

    const handleSubmit = async e => {
        e.preventDefault();
        if(Object.values(password).some( campo => campo === "" )) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                err: true
            });
            return;
        }

        if( password.password_nueva.length < 6 ) {
            setAlerta({
                msg: "La contraseña debe tener mínimo 6 caracteres",
                err: true
            })
        }

        const respuesta = await guardarPassword(password);
        setAlerta(respuesta);
    }

  return (
    <>
        <AdminNav />
        <h2 className="font-black text-3xl text-center mt.10 ">Cambiar Contraseña</h2>
        <p className="text-xl mt-5 mb-10 text-center ">Modifica tu {""}
            <span className="text-indigo-600 font-bold ">contraseña aquí</span> 
        </p>

        <div className="flex justify-center ">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta {...alerta } /> }
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label 
                            htmlFor="password_actual"
                            className="uppercase font-bold text-gray-600"    
                        >Contraseña Actual</label>
                        <input 
                            type="password"
                            className="border bg-gray-50 w-full p-2 my-5 rounded-lg"
                            name="password_actual"
                            onChange={e => setPassword({
                                ...password, 
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label 
                            htmlFor="password_nueva"
                            className="uppercase font-bold text-gray-600"    
                        >Contraseña Nueva</label>
                        <input 
                            type="password"
                            className="border bg-gray-50 w-full p-2 my-5 rounded-lg"
                            name="password_nueva"
                            onChange={e => setPassword({
                                ...password, 
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Actualizar Contraseña"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer" 
                    />
                </form>

            </div>
        </div>
    </>
  )
}

export default CambiarPassword