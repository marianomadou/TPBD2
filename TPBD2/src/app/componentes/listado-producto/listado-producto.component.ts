import { Component, OnInit, Input } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Producto } from 'src/app/clases/producto';
import { MatTableDataSource } from '@angular/material/table';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
    this.productos = [];
    this.servicioGeneral.productos().traerTodo().subscribe((actions => {
      
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

      this.servicioGeneral.productos().borrarUno(peli.id)
    } else {

    }

  }
  ocultar($event) {
    this.productoElegido = false;
  }


  descargaProductos() {
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


    pdfMake.createPdf(documentDefinition).download('Listado_Productos.pdf');

  }
  getListaProductosPDF() {
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



