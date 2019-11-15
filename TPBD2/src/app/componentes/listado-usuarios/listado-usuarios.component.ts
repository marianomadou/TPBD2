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

  peliculas: Array<any> = Array<any>();
  displayedColumns: string[] = ['Email', 'UID', 'Name'];
  dataSource ;
  productoElegido;  

  constructor(private servicioGeneral: MiservicioPrincipalService) {  }


  ngOnInit() {

    this.servicioGeneral.usuarios().traerTodosUsuarios().subscribe((actions => {
      this.peliculas= [];
      actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
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
    var r = confirm("Seguro?!" ) ;
    if (r == true) {
      console.log(
        "You pressed OK!");
        this.servicioGeneral.productos().borrarUno(peli.id) 
    } else {
      console.log(
        "You pressed Cancel!");
    }

  }
  ocultar($event)
  {
    console.log("llego");
    
    this.productoElegido= false;
  }


}
