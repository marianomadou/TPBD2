import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Producto } from '../clases/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage,
  ) {

  }

  filtrado: any;

  traerTodo() {
    return this.fireStore.collection('productos').snapshotChanges();
  }

  traerUno(id) {
    return this.fireStore.collection('productos').doc(id).valueChanges();
  }

  borrarUno(uid) {
    return this.fireStore.collection('productos').doc(uid).delete();
  }

  actualizarUno(productoActualizar) {
    return this.fireStore.collection('productos').doc(productoActualizar.uid).update(productoActualizar);
  }


  enviarConFoto(productoNuevo: Producto, archivo) {
    var lala = this.storage.ref('productos/' + productoNuevo.nombre).put(archivo);
    lala.percentageChanges().subscribe((porcentaje) => {
      porcentaje = Math.round(porcentaje);
      if (porcentaje == 100) {
        setTimeout(() => this.storage.ref('productos/' + productoNuevo.nombre).getDownloadURL().subscribe((URL) => {
          let id = this.fireStore.createId();
          productoNuevo.uid = id;
          productoNuevo.url = URL;
          this.fireStore.collection('productos').doc(id).set(JSON.parse(JSON.stringify(productoNuevo)), { merge: true });
        }), 3000);
        //this.actualizarUno(productoNuevo);
      }
    });

  }






}