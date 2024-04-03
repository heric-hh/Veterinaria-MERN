import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        err: true
      });
      return;
    }

    try {
      const {data} = await clienteAxios.post("/veterinarios/login", {email, password});
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        err: true
      })
    }

  }

  const {msg} = alerta;

  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra Tus <span className="text-black">Pacientes</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {
            msg &&  <Alerta {...alerta} />
          }  
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input 
                type="email"
                placeholder="Email de registro"
                className="border w-full p-3 mt-3 bg-gray-50 rounded"
                value={email}
                onChange={e => setEmail(e.target.value)} 
              />
            </div>
            <div className="my-5">
              <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">
                Password
              </label>
              <input 
                type="password"
                placeholder="Contraseña de registro"
                className="border w-full p-3 mt-3 bg-gray-50 rounded"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <input type="submit" value="Iniciar Sesión" 
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase 
            font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
          </form>
          <nav className="mt-8 lg:flex lg:justify-between">
            <Link to="/registrar"
              className="block text-center my-5 text-gray-500"
            >¿No tienes una cuenta? Regístrate</Link>
            <Link to="/olvide-password"
              className="block text-center my-5 text-gray-500"
            >Olvide mi contraseña</Link>
          </nav>
        </div>
    </>
  )
}

export default Login