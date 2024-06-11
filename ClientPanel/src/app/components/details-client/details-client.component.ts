import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../../models/client';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrl: './details-client.component.css'
})
export class DetailsClientComponent {
  id?: string;
  client?: Client;
/**
 *
 */
constructor(
private  clientService : ClientService,
private  route : ActivatedRoute,
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
}
