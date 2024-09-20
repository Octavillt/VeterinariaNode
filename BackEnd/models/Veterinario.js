import mongus from 'mongoose';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';

const veterinarioSchema = new mongus.Schema({
    nombre: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    telefono: { type: String, trim: true },
    web: { type: String, trim: true },
    token: { type: String, trim: true, default: generarId() },
    confirmado: { type: Boolean, default: false },
});

veterinarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

veterinarioSchema.methods.compararPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
};


const Veterinario = mongus.model('Veterinario', veterinarioSchema);

export default Veterinario;