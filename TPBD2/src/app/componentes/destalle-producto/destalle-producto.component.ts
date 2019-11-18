import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { MatTableDataSource } from '@angular/material/table';
import { Local } from 'src/app/clases/local';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { LogStock } from 'src/app/clases/log-stock';
import { LogLocal } from 'src/app/clases/log-local';
import { LogUsuario } from 'src/app/clases/log-Usuario';
import { timer } from 'rxjs';



@Component({
  selector: 'app-destalle-producto',
  templateUrl: './destalle-producto.component.html',
  styleUrls: ['./destalle-producto.component.scss']
})
export class DestalleProductoComponent implements OnInit {

  @Input() producto: Producto;
  @Output() modal: EventEmitter<any>;
  displayedColumns: string[] = ['usuario', 'Local', 'Detalle', 'cantidad'];
  dataSource;
  nuevoStockDetalle;
  nuevoStock;
  modificar;
  listaLocales = [];
  showSpinner: boolean;

  constructor(private servicioGeneral: MiservicioPrincipalService) {
    this.modal = new EventEmitter();
    this.listaLocales = new Array();

  }

  ngOnInit() {
    this.modificar = true;
    this.nuevoStockDetalle = "";
    this.nuevoStock = 0;
    this.servicioGeneral.productos().traerTodo().subscribe(() => this.dataSource = new MatTableDataSource(this.producto.logDeStock));
    ////////////
    let usuario = this.servicioGeneral.usuarios().traerUsuarioActual();
    this.servicioGeneral.locales().traerLocalDelUsuario(usuario);

  }

  destruir() {
    this.modal.emit(false);

  }

  agregarStock() {

    let productoYaExiste = false;
    this.showSpinner = true;
    timer(3000).subscribe( () => {
      this.showSpinner = false;
    });

    let local: Local = this.servicioGeneral.locales().traerLocalActual();
    local.logLocal.forEach((element) => {
      if (element.productoUid == this.producto.uid) {
        if ((element.stock + this.nuevoStock) > 0 && !productoYaExiste) {
          element.stock = element.stock + this.nuevoStock;
          productoYaExiste = true;
          this.producto.stock=element.stock;
          this.nuevoStockDetalle = "existe";
          this.producto.logDeStock.push(JSON.parse(JSON.stringify(new LogStock(this.servicioGeneral.autenticar().afAuth.auth.currentUser.email, new Date(Date.now()), this.nuevoStock, this.servicioGeneral.usuarios().traerUsuarioActual().local, this.nuevoStockDetalle))));

        }
        if ((element.stock + this.nuevoStock) < 0 && !productoYaExiste) {
          productoYaExiste = true;
          this.producto.stock=element.stock;
          this.nuevoStockDetalle = "NO ALCANZA";

        }
      }
    });
    if (!productoYaExiste) {
      local.logLocal.push(new LogLocal(this.servicioGeneral.usuarios().traerUsuarioActual().email, this.producto.uid, new Date(Date.now()), this.nuevoStock, this.nuevoStockDetalle, this.producto.nombre));
      this.producto.logDeStock.push(JSON.parse(JSON.stringify(new LogStock(this.servicioGeneral.autenticar().afAuth.auth.currentUser.email, new Date(Date.now()), this.nuevoStock, this.servicioGeneral.usuarios().traerUsuarioActual().local, this.nuevoStockDetalle))));
    }
    this.servicioGeneral.productos().actualizarUno(this.producto);
    this.servicioGeneral.usuarios().usuarioActual.logDeStock.push(JSON.parse(JSON.stringify(new LogUsuario(this.servicioGeneral.usuarios().traerUsuarioActual().email, this.producto.uid, new Date(Date.now()), this.nuevoStock, this.nuevoStockDetalle, this.producto.nombre, this.servicioGeneral.usuarios().traerUsuarioActual().local))));
    this.servicioGeneral.actualizarLogsTodos(this.producto, local);

  }


  async  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}