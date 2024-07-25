import { Client } from './../../models/client';
import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthClientService } from '../../services/auth-client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  clients!: Client[];
  searchClient! : Client[];
  total?: number;
  constructor(
    private clientService: ClientService,
    private authService : AuthClientService,
    private router : Router,
    private toastr : ToastrService
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(
      (auth) => {
        console.log('Authentication object:', auth);
  
        if (auth && typeof auth.uid === 'string') {
          this.clientService.getClients(auth.uid).subscribe(
            (clients) => {
              console.log('Clients fetched:', clients);
              this.searchClient = this.clients = clients;
              this.total = this.getTotal();
            },
            (error) => {
              console.error('Error fetching clients:', error);
            }
          );
        } else {
          console.error('Authentication failed or UID is not valid');
        }
      },
      (error) => {
        console.error('Error fetching authentication:', error);
      }
    );
    
  }
  
//  method
  getTotal() {
   return this.clients.reduce((total, client) => {
     return total + parseFloat(client.balance!.toString());
    },0)
  }

  search(query :string){
    this.searchClient = (query) ? this.clients.filter((client) => client.firstName?.includes(query)) : this.clients ;
  }

  deleteClient(id : string){
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the client
        this.clientService.deleteClient(id);
        this.toastr.error('deleted');
        this.router.navigate(['/']);
        Swal.fire(
          'Deleted!',
          'The client has been deleted.',
          'success'
        );
      }
    }
  )
    
    
  }
}
