import { Component } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent {
  client : Client ={
    firstName : "",
    lastName : "",
    email : "",
    telephone: null,
    balance : 0
  }
/**
 *
 */
constructor(private clientService : ClientService , private route : Router, private toastr : ToastrService) {
  
  
}
  onSubmit(){
    this.clientService.newClient(this.client);
    this.toastr.success('added successfuly');
    return this.route.navigate(['/']);
  }
}
