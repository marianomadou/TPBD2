import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Local } from 'src/app/clases/local';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';

@Component({
  selector: 'app-listado-locales',
  templateUrl: './listado-locales.component.html',
  styleUrls: ['./listado-locales.component.scss']
})
export class ListadoLocalesComponent implements OnInit {

  peliculas: Array<any> = Array<any>();
  displayedColumns: string[] = ['Nombre', 'Direccion'];
  dataSource;
  productoElegido;


  constructor(private servicioGeneral: MiservicioPrincipalService) { }


  ngOnInit() {

    this.servicioGeneral.locales().traerTodo().subscribe((actions => {
      this.peliculas = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Local;
        console.info(data, " data");
        this.peliculas.push(data);
      });
      this.dataSource = new MatTableDataSource(this.peliculas);
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
      this.servicioGeneral.locales().borrarUno(peli.id)
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



