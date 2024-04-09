import { useState } from "react"
import Alerta from "./Alerta";

const Formulario = () => {

    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [fecha, setFecha] = useState(Date.now());
    const [sintomas, setSintomas] = useState("");

    const [alerta, setAlerta] = useState({});

    const handleSubmit = e => {
        e.preventDefault();
        
        //Validando el formulario
        if([nombre, propietario, email, fecha, sintomas].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                err: true
            });
            return;
        } 
    }

    const {msg} = alerta;

    return (
    <>
        <p className="text-lg text-center mb-10">
            Añade tus pacientes y {""}
            <span className="text-indigo-600 font-bold">adminístralos</span>
        </p>

        <form
            onSubmit={handleSubmit} 
            className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md">
            <div className="mb-5">
                <label 
                    htmlFor="nombre"
                    className="font-bold text-gray-700"
                > Nombre de la mascota</label>
                <input 
                    id="nombre"
                    placeholder="Rookie"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    type="text" 
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="propietario"
                    className="font-bold text-gray-700"
                > Nombre del propietario</label>
                <input 
                    id="propietario"
                    placeholder="Pedro"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    type="text" 
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="email"
                    className="font-bold text-gray-700"
                > Email</label>
                <input 
                    id="email"
                    placeholder="mail@mail.com"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="fecha"
                    className="font-bold text-gray-700"
                > Fecha de Alta </label>
                <input 
                    id="fecha"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    type="date"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)} 
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="sintomas"
                    className="font-bold text-gray-700"
                > Síntomas </label>
                <textarea 
                    id="sintomas"
                    placeholder="No quiere comer"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value="Agregar Paciente"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer
                transition-colors"
            />
        </form>

        {msg && <Alerta {...alerta} /> }

    </>
    
  )
}

export default Formulario