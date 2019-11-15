import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Local } from '../clases/local';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class LocalesService {

  localActual;
  constructor(
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage,
  ) {

  }

  filtrado: any;


  enviarLocal(nuevoLocal: Local) {
    let id = this.fireStore.createId();
    nuevoLocal.uid = id;
    this.localActual = nuevoLocal;
    return this.fireStore.collection('locales').doc(id).set(JSON.parse(JSON.stringify(nuevoLocal)), { merge: true });
  }

  traerTodo() {
    return this.fireStore.collection('locales').snapshotChanges();
  }


  /**
   * 
   */
  traerTodoArrayLocales() {

    let arrayListaLocales = this.fireStore.collection('locales').snapshotChanges().subscribe(e => {
      e.map(a => {
        const data = a.payload.doc.data() as Local;
        return data.nombre;

      });
    });
    return arrayListaLocales;
  }
  /**
   * 
   */
  traerLocalDelUsuario(usuario: Usuario) {

    return this.fireStore.collection('locales').snapshotChanges().subscribe(e => {
        e.map(a => {
          const data = a.payload.doc.data() as Local;
          if (data.nombre == usuario.local) {
            console.log(" entro al usuarioñ.loca");
           return this.localActual = data;
          }

        });
      });
  
  }

  traerLocalActual()
  {
    return this.localActual;
  }


  traerUno(id) {
    return this.fireStore.collection('locales').doc(id).valueChanges();
  }

  borrarUno(uid) {
    return this.fireStore.collection('locales').doc(uid).delete();
  }

  actualizarUno(localActualizar: Local) {
    return this.fireStore.collection('locales').doc(localActualizar.uid).update(localActualizar);
  }









}