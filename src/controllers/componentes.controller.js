const { Componente } = require("../models/componente.model");
const { Producto } = require("../models/producto.model");

const controller = {};

const obtenerComponentes = async (req, res) => {
  try {
    const componentes = await Componente.find();
    res.status(200).json(componentes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener los componentes", error: err });
  }
};
controller.obtenerComponentes = obtenerComponentes;

const obtenerComponentePorId = async (req, res) => {
  const { id } = req.params;
  try {
    const componente = await Componente.findOne({ id: id });
    if (!componente) {
      return res.status(404).json({ message: "Componente no encontrado" });
    }
    res.status(200).json(componente);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el componente", error: err });
  }
};
controller.obtenerComponentePorId = obtenerComponentePorId;

const crearComponente = async (req, res) => {
  try {
    const ultimoComponente = await Componente.findOne().sort({ id: -1 });
    const nuevoId = ultimoComponente ? ultimoComponente.id + 1 : 1;

    const { nombre, descripcion, productos } = req.body;

    const nuevoComponente = new Componente({
      id: nuevoId,
      nombre,
      descripcion,
      productos,
    });

    await nuevoComponente.save();
    res.status(201).json(nuevoComponente);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error al crear el componente", error: err });
  }
};
controller.crearComponente = crearComponente;

const actualizarComponente = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, productos } = req.body;
  try {
    const componente = await Componente.findOneAndUpdate(
      { id: id },
      {
        nombre: nombre || undefined,
        descripcion: descripcion || undefined,
        productos: productos || undefined,
      },
      { new: true }
    );
    if (!componente) {
      return res.status(404).json({ message: "Componente no encontrado" });
    }
    res.status(200).json(componente);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al modificar el componente", error: err });
  }
};
controller.actualizarComponente = actualizarComponente;

const eliminarComponente = async (req, res) => {
  const { id } = req.params;
  try {
    const componente = await Componente.findOne({ id: id });
    if (!componente) {
      return res.status(404).json({ message: "Componente no encontrado" });
    }
    await Componente.deleteOne({ id: id });
    await Producto.updateMany(
      { componentes: componente._id },
      { $pull: { componentes: componente._id } }
    );
    res.status(200).json({ message: "Componente borrado exitosamente" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al borrar el componente", error: err });
  }
};
controller.eliminarComponente = eliminarComponente;

const obtenerProductosPorComponente = async (req, res) => {
  const { id } = req.params;
  try {
    const componente = await Componente.findOne({ id });

    if (!componente) {
      return res.status(404).json({ message: "Componente no encontrado" });
    }

    const productos = await Producto.find({ componentes: componente._id });

    if (productos.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron productos para este componente" });
    }

    res.status(200).json(productos);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener los productos", error: err });
  }
};
controller.obtenerProductosPorComponente = obtenerProductosPorComponente;

module.exports = controller;
