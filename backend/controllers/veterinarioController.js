import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarID from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {

    const { email, nombre } = req.body;
    //Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email });

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message });
    }

    try {
        //Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        //Enviar el email
        emailRegistro({ email, nombre, token: veterinarioGuardado.token });

        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error);
    }
}

const perfil = (req, res) => {
    const { veterinario } = req;
    res.json({ perfil: veterinario });
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
        const error = new Error("Tu cuenta no ha sido confirmada");
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

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const existeVeterinario = await Veterinario.findOne({ email });
    if (!existeVeterinario) {
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: error.message });
    }

    try {
        existeVeterinario.token = generarID();
        await existeVeterinario.save();

        //Enviar email con instrucciones
        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        });

        res.json({ msg: "Hemos enviado un email con las instrucciones" });
    } catch (error) {
        console.log(error);
    }

};

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Veterinario.findOne({ token });
    if (tokenValido) {
        res.json({ msg: "Token valido, el usuario existe" });
    } else {
        const error = new Error("Token no valido");
        return res.status(400).json({ msg: error.message });
    }
};

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const veterinario = await Veterinario.findOne({ token });
    if (!veterinario) {
        const error = new Error("Hubo un error");
        return res.status(400).json({ msg: error.message });
    }

    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}