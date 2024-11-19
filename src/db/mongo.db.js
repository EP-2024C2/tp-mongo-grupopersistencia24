const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.MONGO_DB_NAME,
    });
    console.log();
  } catch (error) {
    console.error("Error en la conexión a Mongo", error.message);
  }
}

module.exports = { mongoose, connectToDatabase };
