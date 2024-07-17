import { Component } from '@angular/core';
import { AuthClientService } from '../../services/auth-client.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn : boolean = false;
  userLoggedIn! : string;
  /**
   *
   */
  constructor( private authService : AuthClientService,
               private toast : ToastrService,
               private route : Router 
  ) {
    
    
  }

  ngOnInit(){
    this.authService.getAuth().subscribe(
      (auth) =>{
        if (auth) {
          this.isLoggedIn = true;
          this.userLoggedIn = auth.email || '';
        }
        else  this.isLoggedIn = false ;
      }
    )
  }
  

  // method

  onLogOut(){
    this.authService.logOut();
    this.route.navigate(['/login']);
    this.toast.info('Logout!')
  }

}
