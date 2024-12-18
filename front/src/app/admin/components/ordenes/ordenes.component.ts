import { Component, ElementRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
//services
import { UsersService } from '../../services/users.service';
// components
import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerService } from '../../services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { OrdenesService } from '../../services/ordenes.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [ RouterModule, SpinnerComponent, CommonModule ],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.css',
})
export class OrdenesComponent implements OnInit {

  ordenes!: any;
  idOrdenDeleted!: string;
  @ViewChildren('wrapDelete') wrapDelete!: QueryList<ElementRef>

  constructor(private spinnerService:SpinnerService, private toastr: ToastrService, private ordenesService: OrdenesService){}

  ngOnInit():void {

    this.spinnerService.showSpinner();
    this.getOrdenes();
  }

  getOrdenes():void {
    this.ordenesService.getOrdenes().subscribe({
      next: (ordenes:any ) => {
        console.log(ordenes);

          this.ordenes = ordenes;

      },
    })
  }

  deleteOrden(e:Event, id:string):void {
    this.cancelDelete();
    this.idOrdenDeleted = id;
    e.preventDefault();
    this.wrapDelete.forEach( (el: ElementRef) => {
      if (el.nativeElement.id === id) {
        el.nativeElement.style.display = 'block';
      }
    })
  }

  confirmDelete():void {
    this.ordenesService.deleteOrden(this.idOrdenDeleted).subscribe({
      next: (user) => {
        this.toastr.success('Se eliminó con éxito');
        this.getOrdenes();
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
