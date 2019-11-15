import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Local } from 'src/app/clases/local';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-listado-log-usuario',
  templateUrl: './listado-log-usuario.component.html',
  styleUrls: ['./listado-log-usuario.component.scss']
})
export class ListadoLogUsuarioComponent implements OnInit {

  peliculas: Array<any> = Array<any>();
  displayedColumns: string[] = ['nombre', 'local', 'cantidad', 'detalle'];
  dataSource;
  productoElegido;


  constructor(private servicioGeneral: MiservicioPrincipalService) { }


  ngOnInit() {

    this.servicioGeneral.usuarios().traerTodosUsuarios().subscribe((actions => {
      this.peliculas = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        if (this.servicioGeneral.usuarios().usuarioActual.email == data.email) {
          this.peliculas = data.logDeStock;
        }
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
      this.servicioGeneral.locales().borrarUno(peli.id)
    }
  }
  ocultar($event) {
    this.productoElegido = false;
  }


}
