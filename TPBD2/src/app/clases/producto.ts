import { LogStock } from './log-stock';

export class Producto {

    public uid: string;
  //  public codigo;
    public nombre;
    public costo;
    public fecha_creación;
    public descripcion: string
    public stock: number;
    public logDeStock: Array<LogStock>;
    public url: string;
    public observaciones;
    public alta;

    constructor() {
        this.logDeStock = new Array();
        this.alta="true";
        this.fecha_creación=new Date(Date.now());
    }

}
