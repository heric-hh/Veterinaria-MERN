import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password.length < 6) {
            setAlerta({
                msg: "La contraseña debe tener al menos 6 caracteres",
                err: true
            });
            return;
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const {data} = await clienteAxios.post(url, {password});
            setPasswordModificado(true);
            setAlerta( {
                msg: data.msg
            });
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                err: true
            });
        }
    }

    const {token} = params;

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setAlerta({
                    msg: "Coloca tu nueva contraseña"
                });
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: "Hubo un error con el enlace",
                    err: true
                })
            }
        }
        
        comprobarToken()
    }, []);

    const {msg} = alerta;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl"> Reestablece tu contraseña y no pierdas acceso a tus  
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-8 rounded-xl bg-white">
                {
                    msg &&  <Alerta {...alerta} />
                } 

                { tokenValido && 
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="my-5">
                                <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">
                                    Contraseña
                                </label>
                                <input 
                                    type="password"
                                    placeholder="Ingresa tu nueva contraseña"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <input 
                                type="submit" 
                                value="Guardar Nueva Contraseña" 
                                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase 
                                font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
                        </form>
                    </>
                    }
                    
                    { passwordModificado && 
                        <Link to="/"
                        className="block text-center my-5 text-gray-500"
                        >Inicia Sesión</Link>
                    }
            </div>

        </>
    )
}

export default NuevoPassword;