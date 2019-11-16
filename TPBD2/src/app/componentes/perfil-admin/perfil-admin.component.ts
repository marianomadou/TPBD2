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


usuarioElegido: Usuario;

  constructor(private usuSer: UsuariosService, public servicio: MiservicioPrincipalService) { 
    this.usuarioElegido= new Usuario();
  }

  ngOnInit() {
    this.usuarioElegido=this.usuSer.traerUsuarioActual();
  }

  public scrollToElement(element): void {
    element.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  }

}
