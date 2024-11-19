process.env.NODE_ENV = "development";

const { Producto } = require("../models/producto.model");
const { Componente } = require("../models/componente.model");
const { Fabricante } = require("../models/fabricante.model");

async function seedDatabase() {
  try {
    const seedDb = process.env.SEED_DB == "true";
    const forceDb = process.env.FORCE_DB == "true";
    console.log(seedDb, forceDb);

    if (forceDb) {
      await Producto.deleteMany({});
      await Fabricante.deleteMany({});
      await Componente.deleteMany({});
    } else {
      console.log(
        "No se borrarán datos ya que la variable de entorno FORCE_DB está configurada en 'false'"
      );
    }

    if (!seedDb) {
      console.log(
        "El seed no se realizará porque la variable de entorno SEED_DB está configurada en 'false'."
      );
      return;
    }

    if (seedDb) {
      console.log(Producto); // Esto debería imprimir el modelo de Producto
      console.log(Componente); // Esto debería imprimir el modelo de Componente
      console.log(Fabricante); // Esto debería imprimir el modelo de Fabricante
      const componentesToInsert = [
        {
          id: 1,
          nombre: "Ryzen 5 3450U",
          descripcion:
            "Procesador de 2.10GHz base (4 núcleos) de AMD para portátiles.",
        },
        {
          id: 2,
          nombre: "Ryzen 5 5500U",
          descripcion:
            "Procesador de 2.10GHz base (6 núcleos) de AMD para portátiles.",
        },
        {
          id: 3,
          nombre: "Ryzen 3 7330U",
          descripcion:
            "Procesador de 2.3GHz base (4 núcleos) de AMD para portátiles.",
        },
        {
          id: 4,
          nombre: "Apple M2",
          descripcion: "Procesador de apple para Macbooks.",
        },
        {
          id: 5,
          nombre: "Pantalla 15 pulgadas 60hz.",
          descripcion:
            "Pantalla LCD para portátiles de 15 pulgadas con una tasa de refresco de 60hz.",
        },
        {
          id: 6,
          nombre: "Pantalla 16.5 pulgadas 60hz.",
          descripcion:
            "Pantalla LCD para portátiles de 16.5 pulgadas con una tasa de refresco de 60hz.",
        },
        {
          id: 7,
          nombre: "RAM 32GB DDR4 SODIMM",
          descripcion: "Memoria RAM DDR4 de 32GB en formato SODIMM.",
        },
        {
          id: 8,
          nombre: "RAM 16GB DDR4 SODIMM",
          descripcion: "Memoria RAM DDR4 de 16GB en formato SODIMM.",
        },
        {
          id: 9,
          nombre: "RAM 8GB DDR4 SODIMM",
          descripcion: "Memoria RAM DDR4 de 8GB en formato SODIMM.",
        },
        {
          id: 10,
          nombre: "HDD 1TB",
          descripcion: "Una unidad de disco duro de 1TB.",
        },
        {
          id: 11,
          nombre: "SSD 512GB",
          descripcion: "Una unidad de estado sólido de 512GB.",
        },
        {
          id: 12,
          nombre: "SSD 256GB",
          descripcion: "Una unidad de estado sólido de 256GB.",
        },
        {
          id: 13,
          nombre: "SSD M2 1TB",
          descripcion: "Una unidad de estado sólido factor M2 de 1TB.",
        },
      ];

      const createdComponentes = await Componente.insertMany(
        componentesToInsert
      );
      console.log("Componentes creados:", createdComponentes);

      const fabricantesToInsert = [
        {
          id: 1,
          nombre: "TechCorp",
          direccion: "Avenida Corrientes 1094, San Nicolás, C.A.B.A.",
          numeroContacto: "+5491143712345",
          pathImgPerfil: "../assets/fabricantes/fabricante-1-logo.png",
        },
        {
          id: 2,
          nombre: "Green Apple Corporation",
          direccion: "Avenida Santa Fe 2445, Recoleta, C.A.B.A.",
          numeroContacto: "+5491148015678",
          pathImgPerfil: "../assets/fabricantes/fabricante-2-logo.png",
        },
        {
          id: 3,
          nombre: "Noblex",
          direccion: "Avenida Rivadavia 4507, Almagro, C.A.B.A.",
          numeroContacto: "+5491149527890",
          pathImgPerfil: "../assets/fabricantes/fabricante-3-logo.png",
        },
        {
          id: 4,
          nombre: "Tecnologías Trébol",
          direccion: "Avenida Callao 890, Balvanera, C.A.B.A.",
          numeroContacto: "+5491150315467",
          pathImgPerfil: "../assets/fabricantes/fabricante-4-logo.png",
        },
        {
          id: 5,
          nombre: "Diamond Solutions",
          direccion: "Avenida Belgrano 678, Monserrat, C.A.B.A.",
          numeroContacto: "+5491143219876",
          pathImgPerfil: "../assets/fabricantes/fabricante-5-logo.png",
        },
      ];

      const createdFabricantes = await Fabricante.insertMany(
        fabricantesToInsert
      );
      console.log("Fabricantes creados:", createdFabricantes);

      const productosToInsert = [
        {
          id: 1,
          nombre: "Notebook Gaming HX-1000",
          descripcion: "Una notebook gama baja para gaming",
          precio: 899.99,
          pathImg: "../assets/productos/producto-1.jpg",
        },
        {
          id: 2,
          nombre: "Notebook GreenMac Pro",
          descripcion:
            "Super notebook GreenMac Pro, tope de gama (cargador no incluido)",
          precio: 2999.99,
          pathImg: "../assets/productos/producto-2.jpg",
        },
        {
          id: 3,
          nombre: "Notebook Intel CZ-5",
          descripcion: "Notebook Intel gama media para oficina",
          precio: 750.0,
          pathImg: "../assets/productos/producto-3.jpg",
        },
        {
          id: 4,
          nombre: "Notebook Gaming HX-2000",
          descripcion: "Notebook gama media para gaming",
          precio: 999.99,
          pathImg: "../assets/productos/producto-4.jpg",
        },
        {
          id: 5,
          nombre: "Notebook Gaming HX-3000",
          descripcion: "notebook gama media-alta para gaming",
          precio: 1200.99,
          pathImg: "../assets/productos/producto-5.jpg",
        },
        {
          id: 6,
          nombre: "Notebook Gaming HX-3000 Ultra",
          descripcion: "Notebook gama alta para gaming",
          precio: 1379.99,
          pathImg: "../assets/productos/producto-6.jpg",
        },
        {
          id: 7,
          nombre: "Notebook Gaming HX-4000",
          descripcion: "Notebook tope de gama para gaming (alto consumo)",
          precio: 1899.99,
          pathImg: "../assets/productos/producto-7.jpg",
        },
      ];

      const createdProductos = await Producto.insertMany(productosToInsert);
      console.log("Productos creados:", createdProductos);

      await createdProductos[0].updateOne({
        $set: {
          componentes: [
            createdComponentes[0]._id,
            createdComponentes[4]._id,
            createdComponentes[8]._id,
            createdComponentes[9]._id,
          ],
          fabricantes: [createdFabricantes[0]._id],
        },
      });
      await createdProductos[1].updateOne({
        $set: {
          componentes: [
            createdComponentes[3]._id,
            createdComponentes[5]._id,
            createdComponentes[8]._id,
            createdComponentes[11]._id,
          ],
          fabricantes: [createdFabricantes[1]._id],
        },
      });
      await createdProductos[2].updateOne({
        $set: {
          componentes: [
            createdComponentes[1]._id,
            createdComponentes[4]._id,
            createdComponentes[8]._id,
            createdComponentes[9]._id,
          ],
          fabricantes: [createdFabricantes[2]._id],
        },
      });
      await createdProductos[3].updateOne({
        $set: {
          componentes: [
            createdComponentes[1]._id,
            createdComponentes[4]._id,
            createdComponentes[7]._id,
            createdComponentes[10]._id,
          ],
          fabricantes: [createdFabricantes[0]._id],
        },
      });
      await createdProductos[4].updateOne({
        $set: {
          componentes: [
            createdComponentes[1]._id,
            createdComponentes[5]._id,
            createdComponentes[7]._id,
            createdComponentes[11]._id,
            createdComponentes[9]._id,
          ],
          fabricantes: [createdFabricantes[3]._id],
        },
      });
      await createdProductos[5].updateOne({
        $set: {
          componentes: [
            createdComponentes[2]._id,
            createdComponentes[5]._id,
            createdComponentes[7]._id,
            createdComponentes[11]._id,
            createdComponentes[9]._id,
          ],
          fabricantes: [createdFabricantes[3]._id],
        },
      });
      await createdProductos[6].updateOne({
        $set: {
          componentes: [
            createdComponentes[2]._id,
            createdComponentes[5]._id,
            createdComponentes[6]._id,
            createdComponentes[11]._id,
          ],
          fabricantes: [createdFabricantes[4]._id],
        },
      });

      console.log("Datos insertados y relaciones establecidas exitosamente.");
    } else {
      console.log("No se ha realizado el seed, ya existen los datos.");
    }
  } catch (error) {
    console.log("Error al crear los datos:", error);
  }
}

module.exports = seedDatabase;
