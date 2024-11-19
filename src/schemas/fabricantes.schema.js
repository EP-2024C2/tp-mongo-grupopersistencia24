const Joi = require("joi");

const schemaFabricante = Joi.object({
  nombre: Joi.string().required().messages({
    "string.base": "El nombre debe ser una cadena.",
    "string.empty": "El nombre no puede estar vacío.",
    "any.required": "El nombre es obligatorio.",
  }),
  direccion: Joi.string().required().messages({
    "string.base": "La dirección debe ser una cadena.",
    "string.empty": "La dirección no puede estar vacía.",
    "any.required": "La dirección es obligatoria.",
  }),
  numeroContacto: Joi.string().required().messages({
    "string.base": "El número de contacto debe ser una cadena.",
    "string.empty": "El número de contacto no puede estar vacío.",
    "any.required": "El número de contacto es obligatorio.",
  }),
  pathImgPerfil: Joi.string().optional().uri().messages({
    "string.uri": "El pathImgPerfil debe ser una URL válida.",
  }),
});

module.exports = { schemaFabricante };
