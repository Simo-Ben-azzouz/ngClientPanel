import { Component } from '@angular/core';
import { AuthClientService } from '../../services/auth-client.service';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email : string = '';
  password : string = '';

  /**
   *
   */
  constructor(
              private authClient : AuthClientService,
              private route : Router,
              private toastr : ToastrService
  ) {
    
    
  }

  // methode 

  onRegister(){
    this.authClient.register(this.email , this.password)
    .then((register) =>{
      if (register) {
        this.toastr.success('congratulation , you are logged in');
        this.route.navigate(['/']);
      }
    })
    .catch((error) =>{
      this.toastr.show(error)
    })
  }
}
