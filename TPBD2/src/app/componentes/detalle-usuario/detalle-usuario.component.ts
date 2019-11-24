import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { Usuario } from 'src/app/clases/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { timer } from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnInit {


  @Input() producto: Usuario;
  @Output() modal: EventEmitter<any>;
  verLocales;
  usuarioCopia: Usuario;
  listaLocales = [];
  showSpinner: boolean;
  sinDatosParaDescargar: boolean;
  usuarioActual: Usuario;

  constructor(private servicioGeneral: MiservicioPrincipalService, private usuSer: UsuariosService) {
    this.modal = new EventEmitter();
    this.verLocales = true;
    this.usuarioCopia = new Usuario();
    this.listaLocales = new Array();
    this.usuarioActual = this.usuSer.traerUsuarioActual();
    console.log('PERFIL DEL USUARIO',this.usuarioActual.perfil)

  }

  ngOnInit() {
    
    this.sinDatosParaDescargar = true;
    this.usuarioCopia = new Usuario();
    this.servicioGeneral.locales().traerTodo().subscribe((actions) => {
      this.listaLocales = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        this.listaLocales.push(data.nombre);
      })
    });

    if (this.producto.logDeStock.length == 0) {
      this.sinDatosParaDescargar = false;
    }

    if (this.producto.local != "todavia no se carga") {
      this.verLocales = false;
    }
    
  }


  onChange(local) {
    this.usuarioCopia.local = local;
  }

  onChangePerfil(local) {
    this.usuarioCopia.perfil = local;
  }


  destruir() {
    this.modal.emit(false);

  }

  modificarLocal() {
    this.showSpinner = true;
    this.producto.local = this.usuarioCopia.local;
    this.servicioGeneral.usuarios().actualizarUno(this.producto);
    timer(3000).subscribe(() => {
      this.showSpinner = false;
    });
  }

  modificarPerfil() {
    this.showSpinner = true;
    this.producto.perfil = this.usuarioCopia.perfil;
    this.servicioGeneral.usuarios().actualizarUno(this.producto);
    timer(3000).subscribe(() => {
      this.showSpinner = false;
    });
  }



  descargaUsuarioMovimientos() {
    var now = new Date()
    var date = now.toLocaleDateString();
    var time = now.toLocaleTimeString();
    const documentDefinition = {
      content: [
        {
          text: 'Listado de Logs del usuario ' + this.producto.nombre + ' de DOTDOU' + ' Reporte generado el día ' + date + ' a las ' + time,
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


    pdfMake.createPdf(documentDefinition).download('Logs_UsuarioMovimiento.pdf');

  }
  getLogsProductoPDF() {
    let contador: number = 0;
    var fechaAlta;
    var hora;
    const exs = [];
    this.producto.logDeStock.forEach(element => {
      fechaAlta = element.fecha.split('T');
      hora = fechaAlta[1].split('.');
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
              text: "Producto: " + element.nombre,
              style: 'name'
            },
            {
              text: "Fecha: " + fechaAlta[0] + " " + hora[0],
              style: 'date'
            },
            {
              text: "Local: " + element.local,
              style: 'name'
            },
            {
              text: "Cantidad: " + element.cantidad,
              style: 'name'
            },
            {
              text: "Stock: " + element.stock,
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
