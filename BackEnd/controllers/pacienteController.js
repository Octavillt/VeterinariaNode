import Paciente from '../models/Paciente.js';

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msj: 'Error al Obtener los Pacientes...' });
    }
};

const obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario._id);
        res.json(pacientes);
    } catch (error) {
        console.error(error);
    }
};

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findById(id);
        const pacienteString = paciente.veterinario._id.toString();
        const reqVeterString = req.veterinario._id.toString();
        if (pacienteString !== reqVeterString) {
            return res.status(401).json({ msj: 'Usuario no Autentificado…' });
        }
        res.json(paciente);
    } catch (error) {
        console.error(error);
    }
};

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findById(id);
        if (!paciente) {
            return res.status(404).json({ msj: 'Paciente no encontrado...' });
        }
        const pacienteString = paciente.veterinario._id.toString();
        const reqVeterString = req.veterinario._id.toString();
        if (pacienteString !== reqVeterString) {
            return res.status(401).json({ msj: 'Usuario no Autentificado…' });
        }
        // Actualizar paciente
        const { nombre, propietario, telefono, fecha, sintomas } = req.body;

        paciente.nombre = nombre || paciente.nombre;
        paciente.propietario = propietario || paciente.propietario;
        paciente.telefono = telefono || paciente.telefono;
        paciente.fecha = fecha || paciente.fecha;
        paciente.sintomas = sintomas || paciente.sintomas;

        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);

    } catch (error) {
        console.error(error);
    }
};

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findById(id);
        if (!paciente) {
            return res.status(404).json({ msj: 'Paciente no encontrado...' });
        }
        const pacienteString = paciente.veterinario._id.toString();
        const reqVeterString = req.veterinario._id.toString();
        if (pacienteString !== reqVeterString) {
            return res.status(401).json({ msj: 'Usuario no Autentificado…' });
        }
        // Eliminar paciente
        await paciente.deleteOne();
        res.json({ msj: 'Paciente eliminado…' });

    } catch (error) {
        console.error(error);
    }
};

export { agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente };
