import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Desde /api/veterinarios");
})

export default router;