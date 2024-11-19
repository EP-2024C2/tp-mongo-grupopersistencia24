Instrucciones para usar la api:
Antes de arrancar a correr la api, verificar las variables de entorno SEED_DB y FORCE_DB:
-SEED_DB permite ejecutar el seed solamente cuando está en true. 
-FORCE_DB lo que hace es que, al ser true, borra todo lo que había previamente en la base de datos.
Modificar según el resultado buscado.

A la hora de usar alguno de los POST "/productos/:id/componentes" o "/productos/:id/fabricantes", considerar lo siguiente:
-si se usa "/productos/:id/componentes", el/los componentes que se quieran asociar al producto, deben ir en el cuerpo del json con el siguiente formato:
{
    "componentes": [1,2,3] //Cada numero representa un id de componente a asociar.
}
-si se usa "/productos/:id/fabricantes", el/los fabricantes que se quieran asociar al producto, deben ir en el cuerpo del json con el siguiente formato:
{
    "fabricantes": [1,2,3] //Cada numero representa un id de fabricantes a asociar.
}

-Decisiones tomadas y sus explicaciones:
    -Elegí usar referencias en lugar de incrustar los datos en los modelos para evitar problemas en la gestión de la base de datos. Al guardar solo el ObjectId de los fabricantes o componentes en los productos, evito duplicar cantidades de datos, al mismo tiempo que me facilita las actualizaciones: si un fabricante cambia de información, no necesito actualizar todos los productos que lo mencionan, sino que basta con actualizar el fabricante solo una vez. De esta forma logré manejar (a mi parecer) mejor los datos, ya que, si un fabricante es eliminado, se puede manejar adecuadamente en los productos asociados sin necesidad de borrar o modificar los productos directamente.
    -Otra decisión que elegí y que creo que merece ser explicada es la de crear el campo "id" cuando mongo ya crea su propio campo "_id" automáticamente. Y esto fue solamente una decisión para faciltiar el testeo tanto a mí como a quién tenga que corregir este trabajo. Esto lo hice porque, si se tenían que usar las "id" autogeneradas de mongo, eran bastante largas y más incómodo para revisar rápidamente el proyecto, así que simplemente elegí mantener esta "_id" en la base de datos, pero crear también la mía propia con este propósito. Esto se puede revisar ya que en todos los métodos de los distintos controladores, cuando se necesita una "_id", la busco, pero lo hago encontrando el objeto que se necesita mediante la "id" que yo creé. De esta forma, al revisar las funcionalidades, recuerde que todas las "id" comienzan desde el 1.
Probablemente había otras maneras de realizar lo que hice, quizás más eficientemente (sobre todo en cuanto al tema de las largas e incómodas "_id" de mongo, pero no encontré una forma fácil y rápida de cambiarlas), así que espero su corrección en cuanto a este tema.
