import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { ProductosService } from './productos.service';
import { AuthService } from './auth.service';
import { LocalesService } from './locales.service';

@Injectable({
  providedIn: 'root'
})
export class MiservicioPrincipalService {

  constructor(
    private servUsuarios: UsuariosService,
    private servProductos: ProductosService,
    private localServ: LocalesService,
    private auth: AuthService) { }

  autenticar() {
    return this.auth;
  }

  usuarios() {
    return this.servUsuarios;
  }
  productos() {
    return this.servProductos;
  }
  locales() {
    return this.localServ;
  }

  actualizarLogsTodos(producto, local) {
    this.servUsuarios.actualizarUno(this.servUsuarios.usuarioActual);
    this.servProductos.actualizarUno(producto);
    this.localServ.actualizarUno(JSON.parse(JSON.stringify(local)));


  }



















}



