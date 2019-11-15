import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsuariosService } from '../usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  perfil;


  constructor(private _authService: AuthService
    , private _router: Router, private usuario: UsuariosService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    //verificar token servcicio que verifquie token

    //obtener perfil de token
      this.perfil = this.usuario.traerUsuarioActualPerfil();
    if (this.perfil == "admin") {
      return true;
    }
    else {
      this._router.navigate(['/login']);
      return false;
    }


  }
}





