import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { MatTableDataSource } from '@angular/material/table';
import { LogStock } from 'src/app/clases/log-stock';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Local } from 'src/app/clases/local';

@Component({
  selector: 'app-detalle-local',
  templateUrl: './detalle-local.component.html',
  styleUrls: ['./detalle-local.component.scss']
})
export class DetalleLocalComponent implements OnInit {
  @Input() local: Local;
  @Output() modal: EventEmitter<any>;
  displayedColumns: string[] = ['usuario', 'nombre', 'stock', 'detalles'];
  dataSource;
  nuevoStockDetalle;
  nuevoStock;
  modificar;
  listaLocales= [];

  constructor(private servicioGeneral: MiservicioPrincipalService) {
    this.modal = new EventEmitter();
    this.listaLocales = new Array();

  }

  ngOnInit() {
    this.modificar = true;
    this.nuevoStockDetalle = "";
    this.nuevoStock = 0;
    this.servicioGeneral.locales().traerTodo()
    .subscribe(() => this.dataSource = new MatTableDataSource(this.local.logLocal));

  }

  destruir() {
    this.modal.emit(false);

  }

  async  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}