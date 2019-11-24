import { Component, OnInit } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/clases/producto';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { Usuario } from 'src/app/clases/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-listado-producto-usuario',
  templateUrl: './listado-producto-usuario.component.html',
  styleUrls: ['./listado-producto-usuario.component.scss']
})
export class ListadoProductoUsuarioComponent implements OnInit {

  productos: Array<any> = Array<any>();
  productosUnicos: Array<any> = Array<any>();
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Stock', 'Foto'];
  dataSource;
  productoElegido;
  usuarioActual: Usuario;
  localDelProducto;

  constructor(private servicioGeneral: MiservicioPrincipalService, private usuSer: UsuariosService) {
    this.usuarioActual = new Usuario();
    this.usuarioActual = this.usuSer.traerUsuarioActual();
    this.servicioGeneral.productos().traerTodo().subscribe((actions => {
      this.productos = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        data.logDeStock.forEach(element => {
          if (this.usuarioActual.local == element.local) {
            this.productos.push(data);
          }
        });
      });
      this.productosUnicos = [...new Set(this.productos.map(item =>
        item
      ))];
      this.dataSource = new MatTableDataSource(this.productosUnicos);
    }));
  }


  ngOnInit() {
    
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
