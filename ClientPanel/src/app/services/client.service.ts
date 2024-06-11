import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Client } from '../models/client';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  CLientsCollection : AngularFirestoreCollection<Client>;
  CLientsDoc! : AngularFirestoreDocument<Client>;

  constructor(private afs : AngularFirestore) { 
    this.CLientsCollection = this.afs.collection('clients');
  }

  // method get
  getClients(): Observable<Client[]> {
    return this.CLientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  newClient (client : Client){
    this.CLientsCollection.add(client);
  }

  getClient (id : string) : Observable<Client | undefined>{
    return this.CLientsCollection.doc(id).valueChanges();
  }
}
