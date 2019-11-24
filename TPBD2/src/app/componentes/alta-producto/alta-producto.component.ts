import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Producto } from 'src/app/clases/producto';
import { Usuario } from 'src/app/clases/usuario';
import { LogStock } from 'src/app/clases/log-stock';
import { timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.scss']
})
export class AltaProductoComponent implements OnInit {
  productos: Array<any> = Array<any>();
  nuevoProducto: Producto;
  archivo: any;
  ver: boolean;
  valorActor;
  showSpinner: boolean;
  existe: boolean;

  constructor(private serviciogeneral: MiservicioPrincipalService, private auth: AuthService, private toastr: ToastrService) {
    this.nuevoProducto = new Producto();
    this.existe = false;
    this.ver = true;
    this.productos = [];
    this.serviciogeneral.productos().traerTodo().subscribe((actions => {
      actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        this.productos.push(data);

      });

    }));

  }

  comprobarPrevios(nombreProducto) {
    this.productos.forEach(element => {
      if (element.nombre == nombreProducto) {
        this.existe = true;
      } else {
        this.existe = false;
      }
    });
  }

  ngOnInit() {
  }

  cargar() {
    this.comprobarPrevios(this.nuevoProducto.nombre);
    if (this.existe == false) {
      this.showSpinner = true;
      this.nuevoProducto.stock = 0;
      this.nuevoProducto.logDeStock = new Array();
      timer(3000).subscribe(() => {
        this.showSpinner = false;
      });
      this.nuevoProducto.logDeStock.push(new LogStock(this.serviciogeneral.autenticar().afAuth.auth.currentUser.email, new Date(Date.now()), this.nuevoProducto.stock, this.serviciogeneral.usuarios().traerUsuarioActual().local, "instanciado"));
      this.serviciogeneral.productos().enviarConFoto(this.nuevoProducto, this.archivo);
      this.toastr.success('El producto ' + this.nuevoProducto.nombre + ' fue creado con éxito!');

    } else {
      this.toastr.error('Revise el listado antes de asignar un nuevo producto', 'ERROR: Ya existe un producto con ese nombre', {
        timeOut: 4000
      });
    }
    this.existe = true;
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
