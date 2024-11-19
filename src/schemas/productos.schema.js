const Joi = require("joi");

const schemaProducto = Joi.object({
  nombre: Joi.string().min(3).max(100).required().messages({
    "string.base": "El nombre debe ser una cadena.",
    "string.empty": "El nombre no puede estar vacío.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre no puede tener más de 100 caracteres.",
    "any.required": "El nombre es obligatorio.",
  }),
  descripcion: Joi.string().optional().allow("").max(500).messages({
    "string.base": "La descripción debe ser una cadena.",
    "string.max": "La descripción no puede tener más de 500 caracteres.",
  }),
  precio: Joi.number().positive().precision(2).required().messages({
    "number.base": "El precio debe ser un número.",
    "number.positive": "El precio debe ser un número positivo.",
    "number.precision": "El precio no puede tener más de 2 decimales.",
    "any.required": "El precio es obligatorio.",
  }),
  pathImg: Joi.string().optional().uri().messages({
    "string.uri": "El pathImg debe ser una URL válida.",
  }),
});

module.exports = { schemaProducto };
