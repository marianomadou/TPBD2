import { Component, OnInit, Input } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Producto } from 'src/app/clases/producto';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-listado-producto',
  templateUrl: './listado-producto.component.html',
  styleUrls: ['./listado-producto.component.scss']
})
export class ListadoProductoComponent implements OnInit {

  productos: Array<any> = Array<any>();
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Stock', 'Foto'];
  dataSource;
  productoElegido;


  constructor(private servicioGeneral: MiservicioPrincipalService) { }


  ngOnInit() {

    this.servicioGeneral.productos().traerTodo().subscribe((actions => {
      this.productos = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        this.productos.push(data);
      });
      this.dataSource = new MatTableDataSource(this.productos);
    }));



  }

  async  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  elegir(nombre) {
    this.productoElegido = nombre;
  }






  eliminar(peli) {
    var r = confirm("Press a button!");
    if (r == true) {
      console.log(
        "You pressed OK!");
      this.servicioGeneral.productos().borrarUno(peli.id)
    } else {
      console.log(
        "You pressed Cancel!");
    }

  }
  ocultar($event) {
    console.log("llego");

    this.productoElegido = false;
  }


}



