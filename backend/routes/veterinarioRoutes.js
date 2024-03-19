import express from "express";
import { registrar, perfil } from "../controllers/veterinarioController.js";

const router = express.Router();

router.post("/", registrar);

router.get("/perfil", perfil);

router.get("/login", (req, res) => {
    res.send("Desde /api/veterinarios/login");
});

export default router;