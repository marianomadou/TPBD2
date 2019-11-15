import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { Usuario } from 'src/app/clases/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';

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

  constructor(private servicioGeneral: MiservicioPrincipalService) {
    this.modal = new EventEmitter();
    this.verLocales = true;
    this.usuarioCopia = new Usuario();
    this.listaLocales = new Array();


  }

  ngOnInit() {
    this.usuarioCopia = new Usuario();
    this.servicioGeneral.locales().traerTodo().subscribe((actions) => {
      this.listaLocales = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        this.listaLocales.push(data.nombre);
      })
    });



    if (this.producto.local != "todavia no se carga") {
      this.verLocales = false;
    }
  }


  onChange(local) {
    this.usuarioCopia.local = local;
  }

  onChangePerfil(perfil) {
    this.usuarioCopia.perfil = perfil;
  }


  destruir() {
    this.modal.emit(false);

  }

  modificarLocal() {
    this.producto.local = this.usuarioCopia.local;
    this.servicioGeneral.usuarios().actualizarUno(this.producto);
    alert("perfil modificado")
  }
}
