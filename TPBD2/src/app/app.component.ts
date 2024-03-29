import { Component } from '@angular/core';
import { MiservicioPrincipalService } from './servicios/miservicio-principal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BotDou.com';
  constructor(public servicio: MiservicioPrincipalService, private _router: Router) {
    
    try {
     this.servicio.usuarios().traerUnUsuarioPorMail(localStorage.getItem("email"));      

    } catch (e) {
      
    }

  }
}
