import { Component, ElementRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';

//services
import { UsersService } from '../../services/users.service';
// components
import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerService } from '../../services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { CategoriasService } from '../../services/categorias.service';


@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [ RouterModule, SpinnerComponent ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent implements OnInit {

  categorias!: any;
  idCategoriaDeleted!: string;
  @ViewChildren('wrapDelete') wrapDelete!: QueryList<ElementRef>

  constructor(private spinnerService:SpinnerService, private toastr: ToastrService, private categoriasService: CategoriasService){}

  ngOnInit():void {

    this.spinnerService.showSpinner();
    this.getCategorias();
  }

  getCategorias():void {
    this.categoriasService.getCategorias().subscribe({
      next: (categorias:any ) => {
          this.categorias = categorias;
          console.log(categorias);

      },
    })
  }

  deleteCategoria(e:Event, id:string):void {
    this.cancelDelete();
    this.idCategoriaDeleted = id;
    e.preventDefault();
    this.wrapDelete.forEach( (el: ElementRef) => {
      if (el.nativeElement.id === id) {
        el.nativeElement.style.display = 'block';
      }
    })
  }

  confirmDelete():void {
    this.categoriasService.deleteCategoria(this.idCategoriaDeleted).subscribe({
      next: (user) => {
        this.toastr.success('Se eliminó con éxito');
        this.getCategorias();
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
