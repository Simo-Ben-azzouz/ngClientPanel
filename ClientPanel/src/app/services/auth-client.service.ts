import { auth } from 'firebase';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor(private afAuth : AngularFireAuth) { }

  // methode
  Login(email : string , password : string){
    return new Promise((resolve , reject) =>{
      this.afAuth.signInWithEmailAndPassword(email , password)
      .then((UserData) => resolve(UserData) , (error) => reject(error) )
    })
  }

  getAuth(){
    return this.afAuth.authState.pipe(
      map(auth => auth)
    )
  }
}
