import { auth } from 'firebase';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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

  loginWithGoogle(){
    return new Promise((resolve , reject) =>{
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((UserData) => resolve(UserData) , (error) => reject(error) )
    })
  }

  logOut(){
    this.afAuth.signOut();
  }


  getAuth(){
    return this.afAuth.authState.pipe(
      map(auth => auth)
    )
  }
}
