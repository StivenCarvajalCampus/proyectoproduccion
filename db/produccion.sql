
CREATE DATABASE produccion; 
USE produccion;
CREATE TABLE productos (
    id_producto INT (20)  PRIMARY KEY AUTO_INCREMENT,
    nombre_producto VARCHAR(50) DEFAULT NULL,
    descripcion VARCHAR(50) DEFAULT NULL,
    precio_venta DECIMAL,
    unidad_medida INT (20) DEFAULT NULL  
);
CREATE TABLE insumos (
    id_insumo INT(20) PRIMARY KEY AUTO_INCREMENT,
    nombre_insumo VARCHAR(50) DEFAULT NULL,
    unidad_medida INT(20) DEFAULT NULL,
    precio_unidad DECIMAL,
    fecha DATE,
    proveedor VARCHAR (50) DEFAULT NULL

);

CREATE TABLE inventario (
    id_inventario INT(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    cantidad_stock INT(20) DEFAULT NULL,
    id_producto INT(20)
);
CREATE TABLE categoria_producto(
    id_categoria INT(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(50) DEFAULT NULL,
    id_producto INT (20) 
);
CREATE TABLE registros_produccion(
    id_registro INT(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    fecha_produccion DATE,
    id_producto INT (20) DEFAULT NULL,
    cantidad_producida INT (20) DEFAULT NULL,
    costo_total_producto DECIMAL,
    id_insumos INT(20) DEFAULT NULL
);
ALTER TABLE categoria_producto
ADD CONSTRAINT fk_categoria FOREIGN KEY (id_producto) REFERENCES productos(id_producto);
ALTER TABLE inventario ADD CONSTRAINT fk_inventario FOREIGN KEY(id_producto) REFERENCES productos(id_producto);
ALTER TABLE registros_produccion ADD CONSTRAINT fk_registros FOREIGN KEY (id_producto) REFERENCES productos (id_producto);
ALTER TABLE registros_produccion ADD CONSTRAINT fk_insumos_r FOREIGN KEY (id_insumos) REFERENCES insumos (id_insumo);

/* Inserciones a base de datos*/

INSERT INTO productos (nombre_producto, descripcion, precio_venta, unidad_medida) VALUES ('mug 11oz','mug blanco 11 oz','10.000','36');
INSERT INTO categoria_producto (nombre_categoria, id_producto) VALUES ('Mugs', '1');
INSERT INTO inventario (cantidad_stock, id_producto) VALUES ('36','1');
INSERT INTO insumos (nombre_insumo, unidad_medida, precio_unidad, fecha, proveedor) VALUES('mugs','36','3.500','2023-07-19','Ao importaciones');
INSERT INTO registros_produccion (fecha_produccion, id_producto, cantidad_producida, costo_total_producto, id_insumos) VALUES('2023-07-19','1','5','7.500','1');