const express = require("express");
const router = express.Router();
const controller = require("../controllers/productos.controller");

const { validarJoi } = require("../middlewares/validarJoi");
const { schemaProducto } = require("../schemas/productos.schema");

router.get("/productos", controller.obtenerProductos);
router.get("/productos/:id", controller.obtenerProductoPorId);
router.post("/productos", validarJoi(schemaProducto), controller.crearProducto);
router.put(
  "/productos/:id",
  validarJoi(schemaProducto),
  controller.actualizarProducto
);
router.delete("/productos/:id", controller.eliminarProducto);

router.post(
  "/productos/:id/fabricantes",
  controller.asociarFabricantes
);
router.get(
  "/productos/:id/fabricantes",
  controller.obtenerFabricantesDeProducto
);

router.post(
  "/productos/:id/componentes",
  controller.asociarComponentes
);
router.get(
  "/productos/:id/componentes",
  controller.obtenerComponentesDeProducto
);

module.exports = router;
