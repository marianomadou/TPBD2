import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusquedasComponent } from './componentes/busquedas/busquedas.component';
import { AuthGuard } from './servicios/auth.guard';
import { TodosComponent } from './componentes/todos/todos.component';
import { ListadoProductoComponent } from './componentes/listado-producto/listado-producto.component';


import { PerfilInvitadoComponent } from './componentes/perfil-invitado/perfil-invitado.component';
import { PerfilAdminComponent } from './componentes/perfil-admin/perfil-admin.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { PerfilGuardGuard } from './servicios/guard/perfil-guard.guard';
import { AdminGuard } from './servicios/guard/admin.guard';
import { UsuarioGuard } from './servicios/guard/usuario.guard';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';


const routes: Routes = [


  { path:  'busqueda', component:  BusquedasComponent},
  { path:  'listado/producto', component:  ListadoProductoComponent },
  { path:  'todos', component:  TodosComponent},
  //////////////////
  { path: 'perfil', component: PerfilInvitadoComponent, canActivate: [PerfilGuardGuard] },
  { path: 'admin', component: PerfilAdminComponent, canActivate: [AdminGuard] },
  { path: 'usuario', component: PerfilUsuarioComponent, canActivate: [UsuarioGuard] },
  { path: 'login', component: AltaUsuarioComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
