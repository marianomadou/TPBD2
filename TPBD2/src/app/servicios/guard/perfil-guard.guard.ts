import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsuariosService } from '../usuarios.service';
import { Usuario } from '../../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilGuardGuard implements CanActivate {

  perfil;


  constructor(private _authService: AuthService, private _router: Router, private usuario: UsuariosService) {



  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    //verificar token servcicio que verifquie token

    //obtener perfil de token
    setTimeout(()=>console.log("hello!"),3000);
    this.perfil = this.usuario.traerUsuarioActualPerfil();

        switch (this.perfil) {

      case "admin":
        this._router.navigate(['/admin']);
        return false;

      case "usuario":
        this._router.navigate(['/usuario']);
        return false;

      case "anonimo":
        return true;

      default:
        this._router.navigate(['/login']);
        return false;

    }

  }


}

