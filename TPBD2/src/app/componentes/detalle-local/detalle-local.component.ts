import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { MatTableDataSource } from '@angular/material/table';
import { LogStock } from 'src/app/clases/log-stock';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Local } from 'src/app/clases/local';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  listaLocales = [];
  sinDatosParaDescargar: boolean;

  constructor(private servicioGeneral: MiservicioPrincipalService) {
    this.modal = new EventEmitter();
    this.listaLocales = new Array();

  }

  ngOnInit() {
    this.modificar = true;
    this.sinDatosParaDescargar = true;
    this.nuevoStockDetalle = "";
    this.nuevoStock = 0;
    this.servicioGeneral.locales().traerTodo()
      .subscribe(() => this.dataSource = new MatTableDataSource(this.local.logLocal));
    if (this.local.logLocal.length == 0) {
      this.sinDatosParaDescargar = false;
    }

  }

  destruir() {
    this.modal.emit(false);

  }

  async  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  descargaUsuario() {
    var now = new Date()
    var date = now.toLocaleDateString();
    var time = now.toLocaleTimeString();
    const documentDefinition = {
      content: [
        {
          text: 'Listado de Logs del local ' + this.local.nombre + ' de DOTDOU' + ' Reporte generado el día ' + date + ' a las ' + time,
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


    pdfMake.createPdf(documentDefinition).download('Logs_UsuarioLocal.pdf');

  }
  getLogsProductoPDF() {
    let contador: number = 0;
    var fechaAlta;
    var hora;
    var local;
    const exs = [];
    this.local.logLocal.forEach(element => {
      fechaAlta = element.fecha.split('T');
      hora = fechaAlta[1].split('.');
      local = this.local.nombre
      exs.push(
        [{
          columns: [
            [{
              text: "Log número: " + contador,
              style: 'name'
            },
            {
              text: "Usuario: " + element.usuario,
              style: 'name'
            },
            {
              text: "Local asignado: " + local,
              style: 'name'
            },
            {
              text: "Fecha: " + fechaAlta[0] + " " + hora[0],
              style: 'date'
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

  descargaProductoLocal() {
    var now = new Date()
    var date = now.toLocaleDateString();
    var time = now.toLocaleTimeString();
    const documentDefinition = {
      content: [
        {
          text: 'Listado de Logs del local ' + this.local.nombre + ' en relación a productos asignados de DOTDOU' + 
          ' Reporte generado el día ' + date + ' a las ' + time,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          decoration: 'underline',
          margin: [0, 0, 0, 20]
        },
        this.getLogsProductoLocalPDF(),

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


    pdfMake.createPdf(documentDefinition).download('Logs_ProductoLocal.pdf');

  }
  getLogsProductoLocalPDF() {
    let contador: number = 0;
    var fechaAlta;
    var hora;
    var local;
    const exs = [];
    this.local.logLocal.forEach(element => {
      fechaAlta = element.fecha.split('T');
      hora = fechaAlta[1].split('.');
      local = this.local.nombre
      exs.push(
        [{
          columns: [
            [{
              text: "Log número: " + contador,
              style: 'name'
            },
            {
              text: "Fecha: " + fechaAlta[0] + " - " + hora[0],
              style: 'date'
            },
            {
              text: "Usuario ejecutor: " + element.usuario,
              style: 'name'
            },
            {
              text: "Local asignado: " + local,
              style: 'name'
            },
            {
              text: "Producto: " + element.nombre + " (uid: " + element.productoUid + ").",
              style: 'name'
            },
            {
              text: "Cantidad modificada: " + element.cantidad,
              style: 'name'
            },
            {
              text: "Stock actual: " + element.stock,
              style: 'name'
            },
            {
              text: "Motivo: " + element.detalle,
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

}