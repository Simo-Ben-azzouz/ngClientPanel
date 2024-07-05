import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../../models/client';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrl: './details-client.component.css'
})
export class DetailsClientComponent {
  id?: string;
  client?: Client;
  showBalance : boolean = false;
/**
 *
 */
constructor(
private  clientService : ClientService,
private  route : ActivatedRoute,
private router : Router,
private  toastr : ToastrService
) {}

ngOnInit() {
  this.route.params.subscribe((params : Params)=>{
    this.id = params['id'] ?? ''; // Ensure this.id is a string even if params['id'] is undefined

  });
  
  this.clientService.getClient(this.id!).subscribe(client => {
    this.client = client;
  console.log(this.client);
  
  });
  
  }

  // methode 

  onSubmit(){
    this.client!.id = this.id;
    this.clientService.updateClient(this.client!);
    this.toastr.success('updated');
  }

  deleteClient(id : string){
    if (confirm('are you sure you want to delete this client ?')) {
      this.clientService.deleteClient(id);
      this.toastr.error('deleted');
      this.router.navigate(['/']);
    }
  }
}
