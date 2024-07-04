import { Client } from './../../models/client';
import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  clients!: Client[];
  total?: number;
  constructor(
    private clientService: ClientService,
    private router : Router,
    private toastr : ToastrService
  ) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
      this.total = this.getTotal();
    });
  }
//  method
  getTotal() {
   return this.clients.reduce((total, client) => {
     return total + parseFloat(client.balance!.toString());
    },0)
  }

  deleteClient(id : string){
    if (confirm('are you sure you want to delete this client ?')) {
      this.clientService.deleteClient(id);
      this.toastr.error('deleted');
      this.router.navigate(['/']);
    }
  }
}
