import express from 'express';
import { agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente } from '../controllers/pacienteController.js';
import checkAuth from '../middleware/authMiddleware.js';

const ROUTER = express.Router();

ROUTER
    .route('/')
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes);

ROUTER
    .route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente);

export default ROUTER;