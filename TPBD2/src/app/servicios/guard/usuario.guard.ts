import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsuariosService } from '../usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {
  perfil;


  constructor(
    private _authService: AuthService
    , private _router: Router,
    private usuario: UsuariosService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    //verificar token servcicio que verifquie token

    //obtener perfil de token
    setTimeout(()=>console.log("time3"),3000);

    this.perfil = this.usuario.traerUsuarioActualPerfil();
    if (this.perfil == "usuario") {
      return true;
    }
    else {
      this._router.navigate(['/login']);
      return false;
    }


  }
}