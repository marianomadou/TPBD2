export class LogUsuario {  
    usuario;
    productoUid;
    nombre;
    fecha;
    cantidad;
    stock;
    detalle;
    local;

    constructor(usuario, uid ,date, cant, detalle, nom, local) {
        this.usuario = usuario;
        this.productoUid = uid;
        this.cantidad = cant;
        this.stock = cant;
        this.fecha = date;
        this.detalle= detalle;
        this.nombre= nom;
        this.local = local;
    }
}