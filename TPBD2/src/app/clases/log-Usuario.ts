export class LogUsuario {
    usuario;
    fecha;
    cantidad;
    local;
    detalle;

    constructor(usuario, date, cant, local, detalle) {
        this.usuario = usuario;
        this.cantidad = cant;
        this.fecha = date;
        this.local= local;
        this.detalle= detalle;
    }


}
