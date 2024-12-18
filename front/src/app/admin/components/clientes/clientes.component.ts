import { Component, ElementRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
//interfcaes
import { User, UsersResponse } from '../../interfaces/user.interface';
//services
import { UsersService } from '../../services/users.service';
// components
import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerService } from '../../services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { ClientesService } from '../../services/clientes.service';


@Component({
  selector: 'app-adusuarios',
  standalone: true,
  imports: [ RouterModule, SpinnerComponent ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class Clientes implements OnInit {

  clientes!: any;
  idUserDeleted!: string;
  @ViewChildren('wrapDelete') wrapDelete!: QueryList<ElementRef>

  constructor(private spinnerService:SpinnerService, private toastr: ToastrService, private clientesService: ClientesService){}

  ngOnInit():void {

    this.spinnerService.showSpinner();
    this.getUsers();
  }

  getUsers():void {
    this.clientesService.getClientes().subscribe({
      next: (clientes:any ) => {

          this.clientes = clientes; // ahora cada user de mi array es una instancia de Usuario
      },
    })
  }

  deleteCliente(e:Event, id:string):void {
    this.cancelDelete();
    this.idUserDeleted = id;
    e.preventDefault();
    this.wrapDelete.forEach( (el: ElementRef) => {
      if (el.nativeElement.id === id) {
        el.nativeElement.style.display = 'block';
      }
    })
  }

  confirmDelete():void {
    this.clientesService.deleteCliente(this.idUserDeleted).subscribe({
      next: (user) => {
        this.toastr.success('Se eliminó con éxito');
        this.getUsers();
        this.cancelDelete();
      }
    })
  }

  cancelDelete(){
    this.wrapDelete.forEach( (el:ElementRef) => {
      el.nativeElement.style.display = 'none';
    })
  }

}
