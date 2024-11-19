const mongoose = require("mongoose");

const fabricanteSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  numeroContacto: { type: String, required: true },
  pathImgPerfil: { type: String, required: false },
});

const Fabricante = mongoose.model("Fabricante", fabricanteSchema);

module.exports = { Fabricante };
