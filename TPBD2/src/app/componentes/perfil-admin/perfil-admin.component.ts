import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';


@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.scss']
})
export class PerfilAdminComponent implements OnInit {

  usuarios: Array<any> = Array<any>();
  usuarioElegido: Usuario;

  constructor(private usuSer: UsuariosService, public servicio: MiservicioPrincipalService) {
    this.usuarioElegido = new Usuario();
    this.servicio.usuarios().traerTodosUsuarios().subscribe((actions => {
      this.usuarios = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        this.usuarios.push(data);
      });
    }));

  }

  ngOnInit() {
    this.usuarioElegido = this.usuSer.traerUsuarioActual();
  }

  public scrollToElement(element): void {
    element.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  }

  
  


}
