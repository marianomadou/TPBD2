import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  usuarios: Array<any> = Array<any>();
  displayedColumns: string[] = ['Foto', 'Email', 'Nombre', 'Apellido', 'Local'];
  dataSource;
  usuarioElegido;

  constructor(private servicioGeneral: MiservicioPrincipalService) { }


  ngOnInit() {

    this.servicioGeneral.usuarios().traerTodosUsuarios().subscribe((actions => {
      this.usuarios = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        this.usuarios.push(data);
      });
      this.dataSource = new MatTableDataSource(this.usuarios);
      /* console.log('DATA de tabla de usuarios', this.dataSource) */
    }));



  }

  async  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  elegir(nombre) {
    this.usuarioElegido = nombre;
  }



  eliminar(peli) {
    var r = confirm("Seguro?!");
    if (r == true) {

      this.servicioGeneral.productos().borrarUno(peli.id)
    } else {

    }

  }
  ocultar($event) {
    this.usuarioElegido = false;
  }


}
