# TP Base de datos NoSql 
## Base de datos Tecnicatura Superior en Programación. UTN-FRA 

**Autores: Prof. Villegas Octavio**

## Desarrollado con Angular 8 - Bootstrap: 4.3.1 - Firebase: 7.2.1 - Jquery: 3.4.1

![TP Base de datos NoSql ](https://github.com/marianomadou/TPBD2/blob/master/Documentacion/header_app.jpg)

Firebase deploy en 
## https://tpbd2-b2c61.firebaseapp.com/

### Objetivo: 

El trabajo práctico está dirigido interactuar con una base de datos NoSql, almacenando los  datos jerárquicamente según la necesidad de flujo de datos para la interfaz de usuario. 

* El proyecto debe estar en un repositorio (compartido). 
* Cuenta de firebase. 

### Movile First

![TP Base de datos NoSql ](https://github.com/marianomadou/TPBD2/blob/master/Documentacion/responsive1.jpg)

**Requerimientos:**
Necesitamos controlar el movimiento de stock de nuestra empresa, logrando informar todos los movimientos de stock, junto con la fecha, el empleado, el local y la descripción 
de la operación( crear, agregar stock, sacar stock, hacer el borrado lógico). 

**Además:**

A. debe manejar imágenes tanto para los usuario como para los productos. 

![TP Base de datos NoSql ](https://github.com/marianomadou/TPBD2/blob/master/Documentacion/listado_productos.jpg)

B. Debe permitir manejar perfiles. 

![TP Base de datos NoSql ](https://github.com/marianomadou/TPBD2/blob/master/Documentacion/abm_user.jpg)

C. Se debe informar por cada producto, todas las operaciones. 

![TP Base de datos NoSql ](https://github.com/marianomadou/TPBD2/blob/master/Documentacion/listado_productos_pdf.jpg)

D. Se debe informar por cada usuario la operaciones realizadas 

![TP Base de datos NoSql ](https://github.com/marianomadou/TPBD2/blob/master/Documentacion/listado_usuarios_pdf.jpg)

E. Se debe informar por cada local los usuarios. 

![TP Base de datos NoSql ](https://github.com/marianomadou/TPBD2/blob/master/Documentacion/listado_locales_pdf.jpg)

F. Se debe informar por cada local los cambios sobre los productos. 



**Datos del producto:**
Código, nombre, costo, cantidad, fecha creación, descripción, observaciones. 

![TP Base de datos NoSql ](https://github.com/marianomadou/TPBD2/blob/master/Documentacion/alta_producto.jpg)

**Aclaraciones:**
Para crear el producto, se crea con stock 0 y se agrega el stock al ingresar el producto al local. 

Los empleados sólo pueden estar en un local. 

Dos productos no pueden tener el mismo código (los demás datos si se pueden repetir). 

Utilizar filtros para las búsquedas. 

## Usuarios para testing:

admin: mariano@gmail.com 
pass:123456

user: lucila@gmail.com 
pass:123456

