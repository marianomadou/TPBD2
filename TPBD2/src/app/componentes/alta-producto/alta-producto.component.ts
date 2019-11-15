import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Producto } from 'src/app/clases/producto';
import { Usuario } from 'src/app/clases/usuario';
import { LogStock } from 'src/app/clases/log-stock';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.scss']
})
export class AltaProductoComponent
  implements OnInit {

  peliculaNueva: Producto;
  /*   generos: TipoPelicula; */
  archivo: any;
  ver: boolean;
  valorActor;

  constructor(private serviciogeneral: MiservicioPrincipalService, private auth: AuthService) {
    this.peliculaNueva = new Producto();
    this.ver = true;
  }

  ngOnInit() {

  }

  cargar() {
    this.peliculaNueva.stock = 0;
    this.peliculaNueva.logDeStock = new Array();
    this.peliculaNueva.logDeStock.push(new LogStock(this.serviciogeneral.autenticar().afAuth.auth.currentUser.email, new Date(Date.now()), this.peliculaNueva.stock,this.serviciogeneral.usuarios().traerUsuarioActual().local, "Carga inicial del producto" ));
    this.serviciogeneral.productos().enviarConFoto(this.peliculaNueva, this.archivo);
  }


  detectFiles(event) {
    this.archivo = event.target.files[0];
  }


  mostrar() {
    if (!this.ver) {
      this.ver = true;
    }
    else {
      this.ver = false;
    }
  }






}
