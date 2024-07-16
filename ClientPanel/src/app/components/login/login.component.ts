import { Component } from '@angular/core';
import { AuthClientService } from '../../services/auth-client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email! : string;
  password! : string;
  /**
   *
   */
  constructor(
    private authService : AuthClientService,
    private route : Router,
    private toastr : ToastrService
  ) {}

  ngOnInit(){
    this.authService.getAuth().subscribe(
      (auth) =>{
        if (auth) {
          this.route.navigate(['/']);
        }
      }
    )
  }
  // methode 
  onLogin(){
    this.authService.Login(this.email , this.password)
    .then((auth) =>{
      if (auth) {
        this.toastr.success('You are logged succesfuly');
        this.route.navigate(['/']);
      }
    })
    .catch((error) =>{
      this.toastr.show(error);
    })
  }

  onLoginWithGoogle(){
    this.authService.loginWithGoogle()
    .then((auth) =>{
      if (auth) {
        this.toastr.success('You are logged succesfuly');
        this.route.navigate(['/']);
      }
    })
    .catch((error) =>{
      this.toastr.show(error);
    })
  }

}
