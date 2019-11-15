import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { MatTableDataSource } from '@angular/material/table';
import { LogStock } from 'src/app/clases/log-stock';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-detalle-info-personal',
  templateUrl: './detalle-info-personal.component.html',
  styleUrls: ['./detalle-info-personal.component.scss']
})
export class DetalleInfoPersonalComponent implements OnInit {
  @Input() producto: Usuario;
  @Output() modal: EventEmitter<any>;
  displayedColumns: string[] = ['email', 'Local', 'Detalle', 'cantidad'];
  dataSource;
  nuevoStockDetalle;
  nuevoStock;
  modificar;
  archivo: any;
  opcion;

  constructor(private servicioGeneral: MiservicioPrincipalService) {
    this.modal = new EventEmitter();
    this.producto = new Usuario();

  }

  ngOnInit() {
    this.modificar = true;
    this.nuevoStockDetalle = "";
    this.nuevoStock = 0;
    this.archivo = false;
    this.opcion = 1;
    // this.servicioGeneral.productos().traerTodo().subscribe(() => this.dataSource = new MatTableDataSource(this.producto.logDeStock));

  }

  destruir() {
    this.modal.emit(false);

  }


  detectFiles(event) {
    console.log(event);
    this.archivo = event.target.files[0];
    this.opcion = 2;


  }


  async  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarInfo() {
    switch (this.opcion) {
      case 1:
        this.servicioGeneral.usuarios().actualizarUno(this.producto);
        break;
      case 2:
        this.servicioGeneral.usuarios().actualizarConFoto(this.producto, this.archivo);
        break;

    }



  }

}
