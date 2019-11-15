import { LogStock } from './log-stock';
import { LogLocal } from './log-local';
import { Producto } from './producto';

export class Local {
    uid:string;
    nombre: string;
    logLocal: Array<LogLocal>;
    direccion: string;
}
