import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Local } from 'src/app/clases/local';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-listado-locales',
  templateUrl: './listado-locales.component.html',
  styleUrls: ['./listado-locales.component.scss']
})
export class ListadoLocalesComponent implements OnInit {

  locales: Array<any> = Array<any>();
  displayedColumns: string[] = ['Nombre', 'Direccion'];
  dataSource;
  productoElegido;


  constructor(private servicioGeneral: MiservicioPrincipalService) { }


  ngOnInit() {

    this.servicioGeneral.locales().traerTodo().subscribe((actions => {
      this.locales = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Local;
        console.info(data, " data");
        this.locales.push(data);
      });
      this.dataSource = new MatTableDataSource(this.locales);
    }));



  }

  async  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  elegir(nombre) {
    this.productoElegido = nombre;
  }


  descargaLocales() {
    const documentDefinition = {
      content: [
        {
          text: 'Listado de Locales de DOTDOU',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          decoration: 'underline',
          margin: [0, 0, 0, 20]
        },
        this.getListaProductosPDF(),

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


    pdfMake.createPdf(documentDefinition).download('Listado_Locales.pdf');

  }
  getListaProductosPDF() {
    const exs = [];
    this.locales.forEach(element => {
      exs.push(
        [{
          columns: [
            [{
              text: "Nombre: " + element.nombre,
              style: 'jobTitle'
            },
            {
              text: "Dirección: " + element.direccion,
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
    this.productoElegido = false;
  }


}



