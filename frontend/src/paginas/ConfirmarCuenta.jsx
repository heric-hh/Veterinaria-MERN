import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const {token} = params;

  useEffect( () => {
    const confirmarCuenta = async () => {
      try {
        const url = `http://localhost:4000/api/veterinarios/confirmar/${token}`;
        const {data} = await axios.get(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        })
        console.log(data);
      } catch (error) {
        setAlerta( {
          msg: error.response.data.msg,
          err: true
        })
      }
      setCargando(false);
    }
    confirmarCuenta();
  }, []); 

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl"> Confirma tu cuenta y comienza a administrar a tus  
          <span className="text-black"> Pacientes</span>
          </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-8 rounded-xl bg-white">
            {!cargando && <Alerta
              {...alerta}
            />}

            {cuentaConfirmada && (
              <Link className="block text-center my-5 text-gray-500" to="/" >
                Iniciar Sesión
              </Link>
            )}
        </div>
    </>
  )
}

export default ConfirmarCuenta