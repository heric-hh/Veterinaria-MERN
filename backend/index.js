import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDb from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            process.env.FRONTEND_URL
        ]
        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }

        if (!origin) {
            return callback(null, true);
        }

        return callback(new Error("NO permitido por CORS"));
    }
}));

app.disable("x-powered-by");
dotenv.config();
conectarDb();


app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

