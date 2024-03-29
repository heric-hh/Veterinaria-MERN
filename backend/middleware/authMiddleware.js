import jwt, { decode } from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        console.log("Si tiene el token con bearer");
    } {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");
            return next();
        } catch (error) {
            error = new Error("Token no valido");
            res.status(403).json({ msg: error.message });
        }
    }

    if (!token) {
        const error = new Error("Token no valido o inexistente");
        res.status(403).json({ msg: error.message });
        next();
    }
    next();
};

export default checkAuth;