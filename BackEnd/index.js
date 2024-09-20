import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const APP = express();
APP.use(express.json());
dotenv.config();
connectDB();

APP.use("/api/veterinarios", veterinarioRoutes);
APP.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;

APP.listen(PORT, () => {
    console.log(`Server running in Port ${PORT}`);
});