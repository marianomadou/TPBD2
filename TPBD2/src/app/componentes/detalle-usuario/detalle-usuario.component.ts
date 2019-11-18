import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { Usuario } from 'src/app/clases/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { timer } from 'rxjs';

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
    this.showSpinner = true;
    this.usuarioCopia.local = local;
    timer(3000).subscribe(() => {
      this.showSpinner = false;
    });
  }

  onChangePerfil(perfil) {
    this.showSpinner = true;
    this.usuarioCopia.perfil = perfil;
    timer(3000).subscribe(() => {
      this.showSpinner = false;
    });
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
