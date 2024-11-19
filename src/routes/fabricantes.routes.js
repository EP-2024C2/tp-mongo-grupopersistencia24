const express = require("express");
const router = express.Router();
const controller = require("../controllers/fabricantes.controller");

const { validarJoi } = require("../middlewares/validarJoi");
const { schemaFabricante } = require("../schemas/fabricantes.schema");

router.get("/fabricantes", controller.obtenerFabricantes);
router.get("/fabricantes/:id", controller.obtenerFabricantePorId);
router.post(
  "/fabricantes",
  validarJoi(schemaFabricante),
  controller.crearFabricante
);
router.put(
  "/fabricantes/:id",
  validarJoi(schemaFabricante),
  controller.actualizarFabricante
);
router.delete("/fabricantes/:id", controller.eliminarFabricante);

router.get(
  "/fabricantes/:id/productos",
  controller.obtenerProductosDeFabricante
);

module.exports = router;
