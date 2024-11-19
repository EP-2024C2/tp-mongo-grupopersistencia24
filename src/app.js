require("dotenv").config();
const express = require("express");
const app = express();
const { connectToDatabase } = require("./db/mongo.db");
const productoRouter = require("./routes/productos.routes");
const componenteRouter = require("./routes/componentes.routes");
const fabricanteRouter = require("./routes/fabricantes.routes");
const seedDatabase = require("./utils/seedDatabase");

app.use(express.json());

app.use(productoRouter);
app.use(componenteRouter);
app.use(fabricanteRouter);

async function startServer() {
  try {
    await connectToDatabase();
    await seedDatabase();

    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
    process.exit(1);
  }
}

startServer();
