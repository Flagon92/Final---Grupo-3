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
import { MeserosService } from '../../services/meseros.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-meseros',
  standalone: true,
  imports: [ RouterModule, SpinnerComponent, CommonModule ],
  templateUrl: './meseros.component.html',
  styleUrl: './meseros.component.css',
})
export class MeserosComponent implements OnInit {

  meseros!: any;
  idMeseroDeleted!: string;
  @ViewChildren('wrapDelete') wrapDelete!: QueryList<ElementRef>

  constructor(private spinnerService:SpinnerService, private meserosService: MeserosService, private toastr: ToastrService){}

  ngOnInit():void {

    this.spinnerService.showSpinner();
    this.getMeseros();
  }

  getMeseros():void {
    this.meserosService.getMeseros().subscribe({
      next: (meseros ) => {
        console.log(meseros);

          this.meseros = meseros; // ahora cada user de mi array es una instancia de Usuario
      },
    })
  }

  deleteMesero(e:Event, id:string):void {
    this.cancelDelete();
    this.idMeseroDeleted = id;
    e.preventDefault();
    this.wrapDelete.forEach( (el: ElementRef) => {
      if (el.nativeElement.id === id) {
        el.nativeElement.style.display = 'block';
      }
    })
  }

  confirmDelete():void {
    this.meserosService.deleteMesero(this.idMeseroDeleted).subscribe({
      next: (mesero) => {
        this.toastr.success('Se eliminó con éxito');
        this.getMeseros();
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

