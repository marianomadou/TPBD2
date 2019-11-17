import { Component, OnInit } from '@angular/core';
import { Local } from '../../clases/local';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { LogStock } from 'src/app/clases/log-stock';
import { LogLocal } from 'src/app/clases/log-local';
import { Producto } from 'src/app/clases/producto';
import { timer } from 'rxjs';

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
  showSpinner: boolean;

  constructor(private serviciogeneral: MiservicioPrincipalService, private auth: AuthService) {
    this.localNuevo = new Local();
    this.ver = true;
  }

  ngOnInit() {

  }

  cargar() {
    this.showSpinner = true;
    this.localNuevo.logLocal = new Array();
    this.serviciogeneral.locales().enviarLocal(this.localNuevo);
    timer(3000).subscribe(() => {
      this.showSpinner = false;
    });
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
