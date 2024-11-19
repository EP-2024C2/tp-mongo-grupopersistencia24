const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  pathImg: String,
  fabricantes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fabricante" }],
  componentes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Componente" }],
});

const Producto = mongoose.model("Producto", ProductoSchema);
module.exports = { Producto };
