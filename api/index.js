const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Configuración de la conexión a MongoDB
const uri = "mongodb://localhost:27017/iotacuicola";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conexión exitosa a MongoDB");
});

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());

// Definición del esquema de Mongoose
const dataSchema = new mongoose.Schema({
  volt: Number,
  amper: Number,
  caudal:Number,
  fecha: String,
  hora: String,
});

const Data = mongoose.model("Datos", dataSchema);

// Ruta para insertar un Data
app.post("/data", async (req, res) => {
  const datosData = req.body;
  try {
    const nuevoData = new Data(datosData);
    await nuevoData.save();
    res.status(201).json({ mensaje: "Data insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar el Data", error);
    res.status(500).json({ mensaje: "Error al insertar el Data" });
  }
});

// Inicio del servidor
app.listen(3000, () => {
  console.log(`Servidor API escuchando en el puerto 3000`);
});
