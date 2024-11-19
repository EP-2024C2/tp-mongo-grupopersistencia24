const { Fabricante } = require("../models/fabricante.model");
const { Producto } = require("../models/producto.model");

const controller = {};

const obtenerFabricantes = async (req, res) => {
  try {
    const fabricantes = await Fabricante.find();
    res.status(200).json(fabricantes);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los fabricantes",
      error: error.message || error,
    });
  }
};
controller.obtenerFabricantes = obtenerFabricantes;

const obtenerFabricantePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const fabricante = await Fabricante.findOne({ id: id });

    if (!fabricante) {
      return res.status(404).json({ message: "Fabricante no encontrado" });
    }

    res.status(200).json(fabricante);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el fabricante", error });
  }
};
controller.obtenerFabricantePorId = obtenerFabricantePorId;

const crearFabricante = async (req, res) => {
  try {
    const ultimoFabricante = await Fabricante.findOne().sort({ id: -1 });
    const nuevoId = ultimoFabricante ? ultimoFabricante.id + 1 : 1;

    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body;

    const nuevoFabricante = new Fabricante({
      id: nuevoId,
      nombre,
      direccion,
      numeroContacto,
      pathImgPerfil,
    });

    await nuevoFabricante.save();
    res.status(201).json(nuevoFabricante);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el fabricante", error });
  }
};
controller.crearFabricante = crearFabricante;

const actualizarFabricante = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el id del fabricante desde los parámetros de la solicitud
    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body; // Los campos a actualizar

    // Buscar y actualizar el fabricante
    const fabricanteActualizado = await Fabricante.findOneAndUpdate(
      { id: id }, // Buscar por el campo 'id' personalizado
      {
        nombre: nombre || undefined,
        direccion: direccion || undefined,
        numeroContacto: numeroContacto || undefined,
        pathImgPerfil: pathImgPerfil || undefined,
      },
      { new: true }
    );
    if (!fabricanteActualizado) {
      return res.status(404).json({ message: "Fabricante no encontrado" });
    }
    res.status(200).json(fabricanteActualizado);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar el fabricante", error });
  }
};
controller.actualizarFabricante = actualizarFabricante;

const eliminarFabricante = async (req, res) => {
  try {
    const { id } = req.params;
    const fabricante = await Fabricante.findOne({ id });

    if (!fabricante) {
      return res.status(404).json({ message: "Fabricante no encontrado" });
    }

    await Fabricante.deleteOne({ id: id });

    await Producto.updateMany(
      { fabricantes: fabricante._id },
      { $pull: { fabricantes: fabricante._id } }
    );

    res.status(200).json({ message: "Fabricante eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el fabricante",
      error: error.message || error,
    });
  }
};
controller.eliminarFabricante = eliminarFabricante;

const obtenerProductosDeFabricante = async (req, res) => {
  try {
    const { id } = req.params;
    const fabricante = await Fabricante.findOne({ id: id });
    if (!fabricante) {
      return res.status(404).json({ message: "Fabricante no encontrado" });
    }
    const productos = await Producto.find({ fabricantes: fabricante._id });

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos del fabricante",
      error,
    });
  }
};
controller.obtenerProductosDeFabricante = obtenerProductosDeFabricante;

module.exports = controller;
