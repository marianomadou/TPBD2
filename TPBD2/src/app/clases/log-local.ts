export class LogLocal {  
    usuario;
    productoUid;
    nombre;
    fecha;
    cantidad;
    stock;
    detalle;

    constructor(usuario, uid ,date, cant, detalle, nom) {
        this.usuario = usuario;
        this.productoUid = uid;
        this.cantidad = cant;
        this.stock = cant;
        this.fecha = date;
        this.detalle= detalle;
        this.nombre= nom;
    }
}