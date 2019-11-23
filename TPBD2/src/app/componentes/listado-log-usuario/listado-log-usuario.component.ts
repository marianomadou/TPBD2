import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Local } from 'src/app/clases/local';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Usuario } from 'src/app/clases/usuario';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  usuarioActual: Usuario;

  constructor(private servicioGeneral: MiservicioPrincipalService, private userSvc: UsuariosService, ) {

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
    setTimeout(() => {
      console.log('HOLAAAAAAAAAAAAAAA', this.peliculas)
    }, 3000);
  }


  ngOnInit() {

    this.usuarioActual = this.userSvc.traerUsuarioActual();




  }

  async  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  elegir(nombre) {
    this.productoElegido = nombre;
  }


  descargaLogsUsuario() {
    var now = new Date()
    var date = now.toLocaleDateString();
    var time = now.toLocaleTimeString();
    const documentDefinition = {
      content: [
        {
          text: 'Listado de Logs del usuario ' + this.usuarioActual.nombre + " " + this.usuarioActual.apellido
            + ' de DOTDOU' + ' Reporte generado el día ' + date + ' a las ' + time,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          decoration: 'underline',
          margin: [0, 0, 0, 20]
        },
        this.getLogsProductoPDF(),

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


    pdfMake.createPdf(documentDefinition).download('Logs_UsuarioActual.pdf');

  }
  getLogsProductoPDF() {
    let contador: number = 0;
    var esafecha;
    var hora;

    const exs = [];
    this.peliculas.forEach(element => {
      esafecha=element.fecha.split('T');
      hora=esafecha[1].split('.');

      exs.push(
        [{
          columns: [
            [{
              text: "Log número: " + contador,
              style: 'name'
            },
            {
              text: "Producto: " + element.nombre,
              style: 'name'
            },
            {
              text: "Fecha: " + esafecha[0],
              style: 'date'
            },
            {
              text: "Hora: " + hora[0],
              style: 'date'
            },
            {
              text: "Cantidad: " + element.cantidad,
              style: 'name'
            },
            {
              text: "Detalle del motivo: " + element.detalle,
              style: 'name'
            },
            {
              text: "Local: " + element.local,
              style: 'name'
            }
            ]
          ]
        }]
      );
      contador++;
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
    }
  }
  ocultar($event) {
    this.productoElegido = false;
  }


}
