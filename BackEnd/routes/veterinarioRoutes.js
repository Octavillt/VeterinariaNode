import express from 'express';
import { registrarVeter, perfilVeter, confirmarVeter, autetificar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const ROUTER = express.Router();

ROUTER.post("/", registrarVeter);
ROUTER.post("/login", autetificar);
ROUTER.post("/olvide-password", olvidePassword);
ROUTER.post("/olvide-password/:token", nuevoPassword);

// ROUTER.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

ROUTER.get("/confirmar/:token", confirmarVeter);
ROUTER.get("/perfil", checkAuth, perfilVeter);
ROUTER.get("/olvide-password/:token", comprobarToken);



export default ROUTER;