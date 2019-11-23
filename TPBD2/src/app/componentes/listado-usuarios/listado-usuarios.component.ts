import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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


  elegir(nombre) {
    this.usuarioElegido = nombre;
  }


  async  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  descargaUsuarios() {
    const documentDefinition = {
      content: [
        {
          text: 'Listado de Usuarios de DOTDOU',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          decoration: 'underline',
          margin: [0, 0, 0, 20]
        },
        this.getListaUsuariosPDF(),

      ],
      styles: {
        name: {
          fontSize: 14,
        },
        jobTitle: {
          fontSize: 16,
          bold: true,
          italics: true
        }
      }
    }

    pdfMake.createPdf(documentDefinition).download('Listado_Usuarios.pdf');

  }


  getListaUsuariosPDF() {
    const exs = [];
    this.usuarios.forEach(element => {
      exs.push(
        [{
          columns: [
            [{
              text: "Email: " + element.email,
              style: 'jobTitle'
            },
            {
              text: "Nombre y Apellido: " + element.nombre + " " + element.apellido,
              style: 'name'
            },
            {
              text: "Perfil: " + element.perfil,
              style: 'name'
            },
            {
              text: "Local: " + element.local,
              style: 'name'
            },
            {
              text: "uid: " + element.uid,
              style: 'name'
            },
            ]
          ]
        }]
      );
    });
    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };

  }

  eliminar(peli) {
    var r = confirm("Press a button!");
    if (r == true) {
      this.servicioGeneral.locales().borrarUno(peli.id)
    } else {
    }

  }

  ocultar($event) {
    this.usuarioElegido = false;
  }
  

}
