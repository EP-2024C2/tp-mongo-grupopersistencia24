const validarJoi = (esquema) => {
  return (req, res, next) => {
    const { error } = esquema.validate(req.body, { abortEarly: false });
    if (error) {
      const errores = error.details.map((detalle) => detalle.message);
      return res
        .status(400)
        .json({ message: "Errores de validación", errores });
    }
    next();
  };
};

module.exports = { validarJoi };