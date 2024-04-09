
// eslint-disable-next-line react/prop-types
const Paciente = ({paciente}) => {

    // eslint-disable-next-line react/prop-types
    const { email, fecha, nombre, propietario, sintomas, _id } = paciente; 

    console.log(fecha);

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat("es-MX", {dateStyle: "long"}).format(nuevaFecha);
    }

    console.log(fecha);

    return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold text-indigo-800 py-1">
            Nombre: {""}
            <span className="font-normal normal-case text-black">{nombre}</span>
        </p>

        <p className="font-bold text-indigo-800 py-1">
            Propietario: {""}
            <span className="font-normal normal-case text-black">{propietario}</span>
        </p>

        <p className="font-bold text-indigo-800 py-1">
            Fecha de Alta: {""}
            <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
        </p>

        <p className="font-bold text-indigo-800 py-1">
            Email: {""}
            <span className="font-normal normal-case text-black">{email}</span>
        </p>

        <p className="font-bold text-indigo-800 py-1">
            Nombre: {""}
            <span className="font-normal normal-case text-black">{sintomas}</span>
        </p>

        <div className="flex justify-between my-5">
            <button
                type="button"
                className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
            >Editar</button>

            <button
                type="button"
                className="py-2 px-10 bg-red-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
            >Eliminar</button>

        </div>
    </div>
  )
}

export default Paciente