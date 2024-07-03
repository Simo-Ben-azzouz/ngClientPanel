import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../../models/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent {

id?: string;  
client : Client ={
  id : '',
  firstName: '',
  lastName:'',
  email:'',
  telephone :null,
  balance: 0
};
showBalance : boolean = false;
/**
 *
 */
constructor(
private  clientService : ClientService,
private  route : ActivatedRoute,
private  toastr : ToastrService,
private  router : Router
) {}

ngOnInit() {
  this.route.params.subscribe((params : Params)=>{
    this.id = params['id'] ?? ''; // Ensure this.id is a string even if params['id'] is undefined
  });

  this.clientService.getClient(this.id!).subscribe(client => {
  this.client = client!;
  console.log(this.client);
  
  });
}
  // methode 
  onUpdate(){
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.toastr.success('updated');
    this.router.navigate(['/']);
  }
}
