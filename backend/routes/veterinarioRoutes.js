import express from "express";
import {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil
} from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

//Endpoint publicos
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);

//Esta ruta envia los datos del perfil para solicitar una nueva password
router.post("/olvide-password", olvidePassword);

router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

//Endpoints privados
router.get("/perfil", checkAuth, perfil);
router.put("/perfil/:id", checkAuth, actualizarPerfil);


export default router;