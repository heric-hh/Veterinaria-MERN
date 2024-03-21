import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {

    const { email } = req.body;
    //Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email });

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msj: error.message });
    }

    try {
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();
        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error);
    }
}

const perfil = (req, res) => {
    res.json({ msj: "Mostrando perfil" });
}

const confirmar = async (req, res) => {
    const { token } = req.params;
    //Buscar un usuario con el token mandado como parámetro
    const usuarioAConfirmar = await Veterinario.findOne({ token });
    if (!usuarioAConfirmar) {
        const error = new Error("Token no valido");
        return res.status(400).json({ msg: error.message });
    }

    try {
        usuarioAConfirmar.token = null;
        usuarioAConfirmar.confirmado = true;
        await usuarioAConfirmar.save();
        res.json({ msg: "Usuario confirmado correctamente" });
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    //Comprobar si el usuario existe

    const usuario = await Veterinario.findOne({ email });
    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(403).json({ msg: error.message });
    }

    //Comprobar si el usuario esta confirmado 

    if (!usuario.confirmado) {
        const error = new Error("TU cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message });
    }

    // Revisar el password
    if (await usuario.comprobarPassword(password)) {
        //Autenticar
        res.json({ token: generarJWT(usuario.id) });
    } else {
        const error = new Error("El password es incorrecto");
        return res.status(403).json({ msg: error.message });
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar
}