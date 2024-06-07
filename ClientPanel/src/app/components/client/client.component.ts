import { Client } from './../../models/client';
import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  clients!: Client[];
  total?: number;
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
      this.total = this.getTotal();
    });
  }

  getTotal() {
   return this.clients.reduce((total, client) => {
     return total + client.balance!;
    },0)
  }
}
