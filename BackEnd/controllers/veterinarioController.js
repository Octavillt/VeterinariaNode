import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";

const registrarVeter = async (req, res) => {
    // console.log(req.body);
    const { nombre, email, password } = req.body;

    // Prevenir Veterianarios Duplicados
    const existeVeterinario = await Veterinario.findOne({ email: email });
    if (existeVeterinario) {
        const error = new Error("El Veterinario ya esta Registrado");
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Guardar un Nuevo Veterinario
        const nuevoVeterinario = new Veterinario(req.body);
        const veterianrioGuardado = await nuevoVeterinario.save();
        res.json(veterianrioGuardado);
    } catch (error) {
        console.error(error);
    }
};

const perfilVeter = (req, res) => {
    const { nombre, email, telefono, web } = req.veterinario;
};

const confirmarVeter = async (req, res) => {
    const { token } = req.params;
    const veterinarioConfirmado = await Veterinario.findOne({ token });
    if (!veterinarioConfirmado) {
        const error = new Error("Veterinario no Encontrado");
        return res.status(400).json({ msg: error.message });
    }
    try {
        veterinarioConfirmado.confirmado = true;
        veterinarioConfirmado.token = null;
        await veterinarioConfirmado.save();
        res.json({ msg: "Usuario Confirmado Correctamente...!" });
    } catch (error) {
        console.error(error);
    }
};

const autetificar = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Comprobar si el Veterinario Existe
        const veterinario = await Veterinario.findOne({ email });
        if (!veterinario) {
            const error = new Error("Usuario no Encontrado");
            return res.status(404).json({ msg: error.message });
        }
        // Comprobar si el Usuario esta Confirmado
        if (!veterinario.confirmado) {
            const error = new Error("Usuario no Confirmado");
            return res.status(400).json({ msg: error.message });
        }

        // Revisar el Password
        if (await veterinario.compararPassword(password)) {
            // Autenticar el Usuario
            res.json({ token: generarJWT(veterinario.id) });
        } else {
            const error = new Error("Password Incorrecto");
            return res.status(403).json({ msg: error.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const existeVeterinario = await Veterinario.findOne({ email });
    if (!existeVeterinario) {
        const error = new Error("Usuario no Encontrado...!");
        return res.status(404).json({ msg: error.message });
    }
    try {
        // Enviar un Email con un Token
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        console.log(existeVeterinario.token);
        // Enviar Email
        res.json({ msg: "Hemos Enviado un Email para Recuperar tu Contraseña..." });
    } catch (error) {
        console.error(error);
    }
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Veterinario.findOne({ token });
    console.log(tokenValido);
    if (tokenValido) {
        res.json({ msg: "Token Valido" });
    } else {
        const error = new Error("Token no Valido...!");
        return res.status(400).json({ msg: error.message });
    }
};

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const veterinario = await Veterinario.findOne({ token });
    if (!veterinario) {
        const error = new Error("Usuario no Encontrado...!");
        return res.status(404).json({ msg: error.message });
    }
    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({ msg: "Password Actualizado Correctamente...!" });
    } catch (error) {
        console.error(error);
    }
};

export { registrarVeter, perfilVeter, confirmarVeter, autetificar, olvidePassword, comprobarToken, nuevoPassword };