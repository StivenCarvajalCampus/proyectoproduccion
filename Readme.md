	**Objetivos**

1. Desarrollar un sistema integral de costos de producción para el emprendimiento SubliTransfer, que permita determinar con precisión el costo de cada producto, como mugs, caramañolas, gorras y otros productos ofrecidos por la empresa. Además, se busca mantener un inventario actualizado de las cantidades disponibles en la empresa.

   El propósito fundamental del sistema es calcular el costo estimado de producción de cada artículo para su venta, garantizando que los precios finales sean adecuados y competitivos en el mercado. De esta manera, se evitarán sobre costos y precios demasiado bajos, lo que permitirá reinvertir en la creación de nuevos productos y el crecimiento sostenible del negocio.

   La plataforma será implementada como una página web, brindando a los usuarios una interfaz amigable y fácil de usar. El sistema recopilará y analizará los datos de los insumos utilizados, la mano de obra, el consumo energético, los gastos operativos y otros elementos relacionados con la producción en sublimación. A partir de esta información, proporcionará informes detallados sobre el costo de cada artículo y el estado actual del inventario.

   Con el sistema de costos de producción en sublimación, SubliTransfer podrá tomar decisiones informadas para optimizar su producción, maximizar los márgenes de ganancia y gestionar eficientemente el inventario. De esta forma, la empresa estará mejor posicionada para mantener su competitividad en el mercado y lograr una re inversión estratégica en el desarrollo de nuevos productos y servicios.

   **Diagrama**

   ![image-20230717092047292](https://github.com/StivenCarvajalCampus/proyectoproduccion/blob/master/imagenes/Diagrama%20en%20blanco.png)
   
   

------

​																			**Uso** 

Para iniciar la insercion de datos podemos iniciar podemos empezar insertando los datos de la tabla productos donde unidad_medida hace referencia a cuantas unidades existen de ese producto (mugs, botilitos, cuadros, esferos etc...) igualmente en la tabla insumos (tintas, hojas, cinta etc...) teniendo en cuenta que son las tablas principales para asi luego poder insertar en tabla categoria_producto que hace referencia a los diferentes tipos de productos e insumos que ofrece la empresa sublitransfer en la tabla inventario encontraremos la cantidad de stock con un id_producto que hace referencia a la tabla productos donde vemos la cantidad disponible de cada producto en la empresa, por ultimo tenemos la tabla registro_produccion donde vamos a registrar la cantidad de productos sublimados y sacados a la venta con el fin de tener un registro con fechas de la salida de material ya listo para la venta.

**Requisitos** 

Antes de comenzar, es necesario tener instalado lo siguiente en su computador:

- Node.js: https://nodejs.org
- MySQL: https://www.mysql.com

Además de esto, es necesario que los paquetes usados fueron las siguientes:

- cookie-parser: Para el manejo de las cookies al momento de realizar la autenticación respectiva en cada ruta necesaria.

- dotenv: Para usar variables de entorno.

- express: Para realizar el montaje del servidor y de la api como tal.

- jose: Para el uso del Json Web Token (JWT).

- mysql2: Para poder hacer una conexión a nuestra base de datos.

  ------

   **Configuración**

  1. Clonar este repositorio en su computador.

  2. Abrir una terminal en la carpeta raíz del proyecto.

  3. Ejecuta el siguiente comando para instalar las dependencias necesarias:

     `npm install`

     Crear un archivo .env en la carpeta raíz del proyecto y agrega las siguientes variables de entorno:

     MY_CONFIG ={"hostname": "127.100.2.1", "port":5015}

     MY_CONNECT = {"host":"localhost","user":"root","database":"produccion","password":"","port":3306}

     

     Asegurese de cambiar database y demás configuraciones según lo tenga configurado en su computador

     ------

     **Base de datos**

     Para obtener la base de datos, ejecuta el archivo `produccion.sql` que esta ubicado en la carpeta db .

     ------

     **Ejecución**

     Para ejecutar correctamente el servidor debe asegurarse de tener `nodemon`,luego de esto solo ejecuta en consola

             npm run dev

------

**End-points**

para empezar a ejecutar end points primero tiene que generar un token con el siguiente end point: 

**jwt Token**: http://127.100.2.1:5015/jwt/token/1

el resultado que nos aparece entre comillas lo vamos a poner en Headers en thunder client en el primer campo a la izquierda ponemos authorization y en el campo de enfrente ponemos el token generado.

**registros_produccion:**
			1.**Get:** http://127.100.2.1:5015/registros 

​			**2.Post**: http://127.100.2.1:5015/registros => body:

		    {
	"id_registro": 2,
	"fecha_produccion": "2023-08-21",
	"id_producto": 1,
	"cantidad_producida": 5,
	"costo_total_producto": 8000,
	"id_insumos": 1
	}

​				**3.Put:** http://127.100.2.1:5015/registros/2 para hacer uso de este endpoint pasamos los parametros de igual forma que en el body anterior dando en fecha el formato yy/mm/dd

​					**4.Delete:** http://127.100.2.1:5015/registros/deleteregistro 
​					Body: "idDelete": 1 aqui va el numero de id que desee borrar

------



**insumos:** 

​				**1.Get:** http://127.100.2.1:5015/insumos

​				**2.Post:** http://127.100.2.1:5015/insumos 

​				**3.Put:** http://127.100.2.1:5015/insumos/2  pasamos el id del dato que queremos cambiar 

​				**4.Delete:** http://127.100.2.1:5015/insumos/deleteinsumo 

**Body:**  para post y put usamos este body 

` {
   "id_insumo":1,
    "nombre_insumo": "cerveceros",
    "unidad_medida": 22,
    "precio_unidad": 40000,
    "fecha": "2023-07-19",
    "proveedor": "Ao importaciones"
  }`

**Body Delete:** 

{
  "idDelete":"1"
}

------

**Productos:**  

​						**1.Get:** http://127.100.2.1:5015/productos

​						**2.Post:** http://127.100.2.1:5015/productos

​						**3.Put:** http://127.100.2.1:5015/productos/6 pasamos el id del dato que queremos cambiar 

​						**4.Delete:** http://127.100.2.1:5015/productos/deleteproductos 

**Body:**  para post y put usamos este body 

`{
  "id_producto": 6,
    "nombre_producto": "mug 11oz",
    "descripcion": "mug magico 11 oz",
    "precio_venta": 10000,
    "unidad_medida": 36
}`

**Body Delete:** 

{
  "idDelete":"1"
}

------

**Inventario:** 

​						**1.Get:** http://127.100.2.1:5015/inventario

​						**2.Post:** http://127.100.2.1:5015/inventario
​						**3.Put:** http://127.100.2.1:5015/inventario/3

​						**4.Delete:** http://127.100.2.1:5015/inventario/deleteinventario

**Body:**  para post y put usamos este body 

`{
   "id_inventario": 1,
    "cantidad_stock": 36,
    "id_producto": 1
}`

**Body Delete:** 

{
  "idDelete":"1"
}

------

**Categoria:** 

​						**1.Get:** http://127.100.2.1:5015/categoria

​						**2.Post:** http://127.100.2.1:5015/categoria

​						**3.Put:** http://127.100.2.1:5015/categoria/6

​						**4.Delete:** http://127.100.2.1:5015/categoria/deletecategoria

**Body:**  para post y put usamos este body 

`{
    "id_categoria": 2,
    "nombre_categoria": "botilitos",
    "id_producto": 2
  }`

**Body Delete:** 

{
  "idDelete":"1"
}
