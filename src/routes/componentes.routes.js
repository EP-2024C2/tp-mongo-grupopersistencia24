const express = require("express");
const router = express.Router();
const controller = require("../controllers/componentes.controller");

const { validarJoi } = require("../middlewares/validarJoi");
const { schemaComponente } = require("../schemas/componentes.schema");

router.get("/componentes", controller.obtenerComponentes);
router.get("/componentes/:id", controller.obtenerComponentePorId);
router.post(
  "/componentes",
  validarJoi(schemaComponente),
  controller.crearComponente
);
router.put(
  "/componentes/:id",
  validarJoi(schemaComponente),
  controller.actualizarComponente
);
router.delete("/componentes/:id", controller.eliminarComponente);

router.get(
  "/componentes/:id/productos",
  controller.obtenerProductosPorComponente
);

module.exports = router;
