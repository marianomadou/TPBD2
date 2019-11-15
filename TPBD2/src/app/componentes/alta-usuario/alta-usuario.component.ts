import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent implements OnInit {
  @Output() editarB: EventEmitter<any> = new EventEmitter<any>();

  email: string;
  pass: string;
  pass2: string;
  ver: boolean;
  crearNuevo;


  constructor(
    public servicio: MiservicioPrincipalService,
    private router: Router) {
    this.ver = true;
    this.crearNuevo = false;
  }

  ngOnInit() {

  }




  crear() {
    if (this.crearNuevo) {
      if (this.pass == this.pass2 && this.pass != "") {
        this.servicio.autenticar().afAuth.user;
        this.servicio.autenticar().altaUsuario(this.email, this.pass, "usuario").then(() => {
          this.servicio.usuarios().traerUnUsuarioPorMail(this.email);
          this.email = "";
          this.pass = "";
        }
        ).catch()
        {
          console.log(" error en el registrar");

        }

      } else {
        alert("toaster que no son claves iguales");
        this.pass = "";
        this.pass2 = "";

        //toaster que no son claves iguales
      }
    }
    else {
      this.crearNuevo = true;
    }


  }

  ingresar() {
    this.servicio.autenticar().usuarioPass(this.email, this.pass).then(async () => {
      await this.servicio.usuarios().traerUnUsuarioPorMail(this.email);

      this.email = "";
      this.pass = "";
    }).catch()
    {
      console.log(" error en el ingreso");

    }


  }

  mostrar() {
    if (!this.ver) {
      this.ver = true;
    }
    else {
      this.ver = false;
    }
  }




  ayuda() {
    this.email = "momo@momo.com";
    this.pass = "123456";
  }


  usuario(opcion) {

    switch (opcion) {
      case 1:
        this.email = "usuario@cliente.com";
        this.pass = "123456";
        break;
      case 2:
        this.email = "lucila@gmail.com";
        this.pass = "123456";
        break;
      case 3:
        this.email = "octavio@mail.com";
        this.pass = "123456";
        break;

    }


  }

}
