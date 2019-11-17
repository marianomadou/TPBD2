import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Producto } from 'src/app/clases/producto';
import { Usuario } from 'src/app/clases/usuario';
import { LogStock } from 'src/app/clases/log-stock';
import { timer } from 'rxjs';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.scss']
})
export class AltaProductoComponent
  implements OnInit {

  nuevoProducto: Producto;
  archivo: any;
  ver: boolean;
  valorActor;
  showSpinner: boolean;

  constructor(private serviciogeneral: MiservicioPrincipalService, private auth: AuthService) {
    this.nuevoProducto = new Producto();
    this.ver = true;
  }

  ngOnInit() {

  }

  cargar() {
    this.showSpinner = true;
    this.nuevoProducto.stock = 0;
    this.nuevoProducto.logDeStock = new Array();
    timer(3000).subscribe(() => {
      this.showSpinner = false;
    });
    this.nuevoProducto.logDeStock.push(new LogStock(this.serviciogeneral.autenticar().afAuth.auth.currentUser.email, new Date(Date.now()), this.nuevoProducto.stock,this.serviciogeneral.usuarios().traerUsuarioActual().local, "instanciado" ));
    this.serviciogeneral.productos().enviarConFoto(this.nuevoProducto, this.archivo); 
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
