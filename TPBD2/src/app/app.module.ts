import { BrowserModule } from '@angular/platform-browser';
/* import { CommonModule } from '@angular/common; */
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule, AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ToastrModule } from 'ngx-toastr';
import { BuscarComponent } from './componentes/buscar/buscar.component';
import { BusquedasComponent } from './componentes/busquedas/busquedas.component';

import { TodosComponent } from './componentes/todos/todos.component';
import { AltaProductoComponent } from './componentes/alta-producto/alta-producto.component';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
import { ListadoProductoComponent } from './componentes/listado-producto/listado-producto.component';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';
import { DestalleProductoComponent } from './componentes/destalle-producto/destalle-producto.component';
import { MaterialModule } from './material.module';
import { DetalleUsuarioComponent } from './componentes/detalle-usuario/detalle-usuario.component';

import { PerfilInvitadoComponent } from './componentes/perfil-invitado/perfil-invitado.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { PerfilAdminComponent } from './componentes/perfil-admin/perfil-admin.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { DetalleInfoPersonalComponent } from './componentes/detalle-info-personal/detalle-info-personal.component';
import { ListadoLocalesComponent } from './componentes/listado-locales/listado-locales.component';
import { AltaLocalesComponent } from './componentes/alta-locales/alta-locales.component';
import { DetalleLocalComponent } from './componentes/detalle-local/detalle-local.component';
import { ListadoLogUsuarioComponent } from './componentes/listado-log-usuario/listado-log-usuario.component';
import { ListadoProductoUsuarioComponent } from './componentes/listado-producto-usuario/listado-producto-usuario.component';


@NgModule({
  declarations: [
    AppComponent,

    BuscarComponent,
    BusquedasComponent,
    TodosComponent,
    AltaUsuarioComponent,
    AltaProductoComponent,
    ListadoProductoComponent,
    ListadoUsuariosComponent,
    DestalleProductoComponent,
    DetalleUsuarioComponent,
    PerfilInvitadoComponent,
    PerfilUsuarioComponent,
    PerfilAdminComponent,
    EncabezadoComponent,
    PiePaginaComponent,
    DetalleInfoPersonalComponent,
    ListadoLocalesComponent,
    AltaLocalesComponent,
    DetalleLocalComponent,
    ListadoLogUsuarioComponent,
    ListadoProductoUsuarioComponent,
  ],
  imports: [
    BrowserModule, MaterialModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
