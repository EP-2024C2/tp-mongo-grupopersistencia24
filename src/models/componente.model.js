const mongoose = require("mongoose");

const ComponenteSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  descripcion: String,
});

const Componente = mongoose.model("Componente", ComponenteSchema);
module.exports = { Componente };
