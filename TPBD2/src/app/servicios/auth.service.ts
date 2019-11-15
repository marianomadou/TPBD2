import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Usuario } from '../clases/usuario';
import { UsuariosService } from './usuarios.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private fireStore: AngularFirestore, private usuarioServ: UsuariosService
  ) {  // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }



  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async clavePassSignin(email, pass) {
    console.log("clavePassSignin");
    return await this.afAuth.auth.signInWithEmailAndPassword(email, pass).then((e)=>console.log("eeeee", e));
   
   
  }

  async usuarioPass(email, pass) {
   return this.clavePassSignin(email, pass);
  }


  async altaUsuario(email, pass, perfil) {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
    console.log(credential.user.uid + " credential.user.uid")
   this.enviar(email, pass, perfil);
  }


  enviar(email, pass, perfill) {
    var sp = email.split('@');
    let usuario = new Usuario();
    usuario.email = email;
    usuario.pass = pass;
    usuario.foto = '"./assets/foto.png",';
    usuario.perfil = perfill;
    usuario.nombre = sp[0];   
    this.usuarioServ.enviarUsuario(usuario);
  }








  private updateUserData(user) {
    // Sets user data to firestore on login
    console.log("user", user);

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    userRef.valueChanges().subscribe((e) => console.log("e", e));


    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
    localStorage.setItem("email", " ");
  }

}