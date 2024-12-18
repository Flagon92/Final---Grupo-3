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
import { PlatillosService } from '../../services/platillos.service';
import { Platillo } from '../../models/platillo.model';


@Component({
  selector: 'app-platillos',
  standalone: true,
  imports: [ RouterModule, SpinnerComponent ],
  templateUrl: './platillos.component.html',
  styleUrl: './platillos.component.css'
})
export class PlatillosComponent implements OnInit {

  platillos!: Platillo[];
  idPlatilloDeleted!: string;
  @ViewChildren('wrapDelete') wrapDelete!: QueryList<ElementRef>
  private usersServices = inject(UsersService);

  constructor(private spinnerService:SpinnerService, private toastr: ToastrService, private platillosService: PlatillosService){}

  ngOnInit():void {

    this.spinnerService.showSpinner();
    this.getPlatillos();
  }

  getPlatillos():void {
    this.platillosService.getPlatillos().subscribe({
      next: (platillos:any ) => {

        this.platillos = platillos.map((platillo:Platillo) => Platillo.transformData(platillo)); // ahora cada user de mi array es una instancia de Usuario

      },
    })
  }

  deleteUser(e:Event, id:string):void {
    this.cancelDelete();
    this.idPlatilloDeleted = id;
    e.preventDefault();
    this.wrapDelete.forEach( (el: ElementRef) => {
      if (el.nativeElement.id === id) {
        el.nativeElement.style.display = 'block';
      }
    })
  }

  confirmDelete():void {
    this.platillosService.deletePlatillo(this.idPlatilloDeleted).subscribe({
      next: (user) => {
        this.toastr.success('Se eliminó con éxito');
        this.getPlatillos();
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
