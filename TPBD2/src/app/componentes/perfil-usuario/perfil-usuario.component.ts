import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {


  usuarioElegido: Usuario;

  constructor(private usuSer: UsuariosService) { 
    this.usuarioElegido= new Usuario();
    this.usuarioElegido.local = "todavia no se carga";
    
  }

  ngOnInit() {
    console.log("algo--------1", this.usuarioElegido.local);    
    this.usuarioElegido=this.usuSer.traerUsuarioActual();
    console.log("algo--------2", this.usuarioElegido.local);    
    
    
  }
}
