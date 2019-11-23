import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class MakepdfService {
  productos: Array<any> = Array<any>();

  constructor() { }

  descargaProductos(productos) {
    const documentDefinition = {
      content: [
        {
          text: 'Listado de Productos de DOTDOU',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          decoration: 'underline',
          margin: [0, 0, 0, 20]
        },
        this.getListaProductosPDF(productos),

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


    pdfMake.createPdf(documentDefinition).download('Listado_Productos.pdf');

  }
  getListaProductosPDF(productos) {
    const exs = [];
    this.productos.forEach(element => {
      exs.push(
        [{
          columns: [
            [{
              text: "Nombre: " + element.nombre,
              style: 'jobTitle'
            },
            {
              text: "Descripción: " + element.descripcion,
              style: 'name'
            },
            {
              text: "Precios: " + element.costo,
              style: 'name'
            },
            {
              text: "Stock: " + element.stock,
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
}
