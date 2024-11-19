const { Producto } = require("../models/producto.model");
const { Componente } = require("../models/componente.model");
const { Fabricante } = require("../models/fabricante.model");
const controller = {};
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};
controller.obtenerProductos = obtenerProductos;

const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findOne({ id: parseInt(id) || undefined });

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};
controller.obtenerProductoPorId = obtenerProductoPorId;

const crearProducto = async (req, res) => {
  try {
    const ultimoProducto = await Producto.findOne().sort({ id: -1 });
    const nuevoId = ultimoProducto ? ultimoProducto.id + 1 : 1;

    const nuevoProducto = new Producto({
      id: nuevoId,
      ...req.body,
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el producto", error });
  }
};
controller.crearProducto = crearProducto;

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, pathImg, fabricantes, componentes } =
      req.body;

    const productoActualizado = await Producto.findOneAndUpdate(
      { id: id },
      {
        nombre: nombre || undefined,
        descripcion: descripcion || undefined,
        precio: precio || undefined,
        pathImg: pathImg || undefined,
        fabricantes: fabricantes || undefined,
        componentes: componentes || undefined,
      },
      { new: true }
    );
    if (!productoActualizado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el producto", error });
  }
};
controller.actualizarProducto = actualizarProducto;

const eliminarProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findOneAndDelete({
      id: req.params.id,
    });
    if (!productoEliminado)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};
controller.eliminarProducto = eliminarProducto;

const asociarFabricantes = async (req, res) => {
  try {
    console.log("Body recibido:", req.body);
    const { id } = req.params;
    const { fabricantes } = req.body;
    if (
      !fabricantes ||
      !Array.isArray(fabricantes) ||
      fabricantes.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "El campo 'fabricantes' es inválido o está vacío" });
    }
    const fabricantesDocs = await Fabricante.find({ id: { $in: fabricantes } });
    const fabricantesObjectIds = fabricantesDocs.map(
      (fabricante) => fabricante._id
    );

    if (fabricantesObjectIds.length !== fabricantes.length) {
      return res.status(400).json({
        message:
          "Uno o más fabricantes proporcionados no existen en la base de datos",
      });
    }
    const producto = await Producto.findOneAndUpdate(
      { id },
      { $addToSet: { fabricantes: { $each: fabricantesObjectIds } } },
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(201).json(producto);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error al asociar fabricantes",
        error: error.message || error,
      });
  }
};
controller.asociarFabricantes = asociarFabricantes;

const obtenerFabricantesDeProducto = async (req, res) => {
  try {
    const producto = await Producto.findOne({ id: req.params.id }).populate(
      "fabricantes"
    );
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(producto.fabricantes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los fabricantes", error });
  }
};
controller.obtenerFabricantesDeProducto = obtenerFabricantesDeProducto;

const asociarComponentes = async (req, res) => {
  try {
    const { id } = req.params;
    const { componentes } = req.body;

    if (
      !componentes ||
      !Array.isArray(componentes) ||
      componentes.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "El campo 'componentes' es inválido o está vacío" });
    }

    const componentesDocs = await Componente.find({ id: { $in: componentes } });
    const componentesObjectIds = componentesDocs.map(
      (componente) => componente._id
    );

    if (componentesObjectIds.length !== componentes.length) {
      return res.status(400).json({
        message:
          "Uno o más componentes proporcionados no existen en la base de datos",
      });
    }
    const producto = await Producto.findOneAndUpdate(
      { id },
      { $addToSet: { componentes: { $each: componentesObjectIds } } },
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ message: "Error al asociar componentes", error });
  }
};
controller.asociarComponentes = asociarComponentes;

const obtenerComponentesDeProducto = async (req, res) => {
  try {
    const producto = await Producto.findOne({ id: req.params.id }).populate(
      "componentes"
    );
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(producto.componentes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los componentes", error });
  }
};
controller.obtenerComponentesDeProducto = obtenerComponentesDeProducto;

module.exports = controller;
