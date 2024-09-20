import mongoose from "mongoose";

// Función asíncrona para conectar a la base de datos de MongoDB
const connectDB = async () => {
    try {
        // Conectamos a la base de datos usando la URL desde las variables de entorno
        const connectDB = await mongoose.connect(process.env.MONGO_URL);
        // useNewUrlParser: true,
        // useUnifiedTopology: true
        // useCreateIndex: true,

        // Obtenemos la URL de conexión exitosa
        const url = `Host: ${connectDB.connection.host}, Puerto: ${connectDB.connection.port}, BDNombre:${connectDB.connection.name}`;

        // Imprimimos un mensaje de éxito en la consola
        console.log(`Conectado a MongoDB: ${url}`);

    } catch (error) {
        // Si ocurre un error, lo mostramos en la consola y terminamos el proceso
        console.table(`Hubo un Error al Conectar con la BD, mensaje de error: ${error.message}`);
        process.exit(1); // Salida del proceso con error
    }
};

export default connectDB;


