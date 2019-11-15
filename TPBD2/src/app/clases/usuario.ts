import { LogStock } from './log-stock';
import { LogLocal } from './log-local';
import { LogUsuario } from './log-Usuario';

export class Usuario {

    email: string;
    nombre: string;
    apellido: string;
    foto;
    date: string;
    pass: string;
    uid: string;
    perfil: string;
    local: string;
    public logDeStock: Array<LogUsuario>;


    constructor() {
        this.perfil = "usuario";
        this.local = "todavia no se carga";
        this.logDeStock = new Array();

    }



}
