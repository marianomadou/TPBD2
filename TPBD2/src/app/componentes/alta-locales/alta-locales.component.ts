import { Component, OnInit } from '@angular/core';
import { Local } from '../../clases/local';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { LogStock } from 'src/app/clases/log-stock';
import { LogLocal } from 'src/app/clases/log-local';
import { Producto } from 'src/app/clases/producto';

@Component({
  selector: 'app-alta-locales',
  templateUrl: './alta-locales.component.html',
  styleUrls: ['./alta-locales.component.scss']
})
export class AltaLocalesComponent implements OnInit {

  localNuevo: Local;
  /*   generos: TipoPelicula; */
  archivo: any;
  ver: boolean;
  valorActor;

  constructor(private serviciogeneral: MiservicioPrincipalService, private auth: AuthService) {
    this.localNuevo= new Local();
    this.ver = true;
  }

  ngOnInit() {

  }

  cargar() {
    console.log("hola");
    
  this.localNuevo.logLocal = new Array();
  this.serviciogeneral.locales().enviarLocal(this.localNuevo);
  }


  detectFiles(event) {
    this.archivo = event.target.files[0];
  }


  mostrar() {
    if (!this.ver) {
      this.ver = true;
    }
    else {
      this.ver = false;
    }
  }






}