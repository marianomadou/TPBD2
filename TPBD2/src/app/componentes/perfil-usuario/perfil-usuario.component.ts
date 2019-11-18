import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {


  usuarioElegido: Usuario;

  constructor(private usuSer: UsuariosService, private toastr: ToastrService , public servicio: MiservicioPrincipalService) {
    this.usuarioElegido = new Usuario();
    this.usuarioElegido.local = "todavia no se carga";

  }

  ngOnInit() {

    this.usuarioElegido = this.usuSer.traerUsuarioActual();
    this.mostrarAlerta();

  }

  mostrarAlerta() {
    if (this.usuarioElegido.local == "todavia no se carga") {
      this.toastr.error('everything is broken', 'Major Error', {
        timeOut: 3000
      });
    } else if (this.usuarioElegido.local != "todavia no se carga") {
      this.toastr.success('El usuario ' + this.usuarioElegido.nombre + ' ya tiene un local asignado', 'Disfrute su dia!');
    }
  }

  public scrollToElement(element): void {
    element.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  }
}
