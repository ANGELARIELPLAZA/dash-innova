const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Agrega esta línea

const app = express();
const port = 3001;

// Configuración de la conexión a MongoDB
const uri = 'mongodb://localhost:27017/iotacuicola';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());
app.use(cors()); // Agrega esta línea

// Definición del esquema de Mongoose
const dataSchema = new mongoose.Schema({
  volt: Number,
  amper: Number
});

const Data = mongoose.model('Datos', dataSchema);

// Ruta para obtener todos los Datos
app.get('/data', async (req, res) => {
  try {
    const datos = await Data.find();
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener los Datos', error);
    res.status(500).json({ mensaje: 'Error al obtener los Datos' });
  }
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor API escuchando en el puerto ${port}`);
});
