import { Component } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthClientService } from '../../services/auth-client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
})
export class AddClientComponent {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    telephone: null,
    balance: 0,
    userId : ''
  };
  /**
   *
   */
  constructor(
    private clientService: ClientService,
    private authClientService : AuthClientService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(){
    this.authClientService.getAuth().subscribe(
      (auth) =>{
        this.client.userId = auth?.uid;
      }
    )
  }

  onSubmit() {
    this.clientService.newClient(this.client);
    this.toastr.success('added successfuly');
    return this.route.navigate(['/']);
  }
}
