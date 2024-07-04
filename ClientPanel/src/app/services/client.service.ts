import { Client } from './../models/client';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
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

  // method 
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

  updateClient (client : Client)
  {
    this.CLientsDoc = this.CLientsCollection.doc(client.id);
    this.CLientsDoc.update(client);
  }

  deleteClient(id : string){
    this.CLientsDoc = this.CLientsCollection.doc(id);
    this.CLientsDoc.delete();
  }
}
